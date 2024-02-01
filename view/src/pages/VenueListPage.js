import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import '../app.css'

function useBookSearch(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Initially set to true

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await axios.post(
        '/venue/list',
        { pageNumber: pageNumber, pageSize: 85, token: localStorage.getItem('Spectator-Token') },
        { withCredentials: true }
      );

      setBooks(prevBooks => [...new Set([...prevBooks, ...response.data.map(b => b.Name)])]);
      setHasMore(response.data.length > 0);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  fetchData();  // Fetch data immediately when the component mounts

}, [pageNumber]);  // Add pageNumber to the dependency array


  return { loading, error, books, hasMore };
}

function VenueListPage() {
  const [pageNumber, setPageNumber] = useState(1);

  const {
    books,
    hasMore,
    loading,
    error
  } = useBookSearch(pageNumber);

  const observer = useRef();
  const lastBookElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      console.log("Entries: ", entries[0].isIntersecting)
      console.log("Node", node)
      console.log("Entries target ", entries[0].target)
      if (entries[0].isIntersecting && hasMore && node === entries[0].target) {
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className='VenuePage'>
      {books.map((book, index) => {
        if (books.length === index+1) {
          return <div className = 'venue-list' ref={lastBookElementRef} key={book}>{book}</div>;
        } else {
          return <div className = 'venue-list' key={book}>{book}</div>;
        }
      })}
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </div>
  );
}

export default VenueListPage;


