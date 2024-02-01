import { useState } from 'react';
import '../app.css'
import axios from 'axios';




function VenuePage() {




  const [venue_info, setvenue_info] = useState({  
    Name: '',
    Capacity: 15,
    Address: '',
    Category: 'Concert'
});

  const handleChange = (event)=>{
    const { name, value } = event.target;
    setvenue_info((prevInfo) => ({ ...prevInfo, [name]: value }));
  }

  const handleSubmit = async (event) => {

    event.preventDefault();
    const result = await post_venueInfo();
    console.log(result)
    alert ('Submition successful');
  }

  async function post_venueInfo() {
  try {
    axios.post('/venue', venue_info, { token: localStorage.getItem("Landlord-Token")})
  } catch (error) {
    console.log(error);
  }
}



  return (
  <div className='VenuePage'>

    <h1>Venue</h1>
    
    <form className='Form'>
      <input className='venue-element' type="text" placeholder="Name" name='Name' value={venue_info.Name} onChange={handleChange} />
      <input className='venue-element' type="text" placeholder="Address" name='Address' value={venue_info.Address} onChange={handleChange} />
      <input className='venue-element' type="number" placeholder="Capacity" name='Capacity' value={venue_info.Capacity} onChange={handleChange} />
      <select className='venue-element' name='Category' value={venue_info.Category} onChange={handleChange}>
            <option>Concert</option>
            <option>Theatre</option>
            <option>Film</option>
            <option>Sports</option>
            <option>Art Exhibition</option>
            <option>Conference</option>
            <option>Party</option>
            <option>Fitness</option>
          </select>

      <button className='venue-element' type="submit" onClick={handleSubmit}>Submit</button>
    </form>
        
    
    
  </div>
  );
}

export default VenuePage;