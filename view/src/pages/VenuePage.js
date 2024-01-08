import { useState } from 'react';
import '../app.css'
import axios from 'axios';




function VenuePage() {




  const [venue_info, setvenue_info] = useState({  
    Name: '',
    Capacity: 5,
    Address: '',
    Category: '',
    Landlord: ''
});

  const handleChange = (event)=>{
    const { name, value } = event.target;
    setvenue_info((prevInfo) => ({ ...prevInfo, [name]: value }));
  }

  const handleSubmit = async (event) => {
    console.log(venue_info)
    event.preventDefault();
    const result = await post_venueInfo();
    console.log(result)
    alert (venue_info);
  }

  async function post_venueInfo() {
  try {
    axios.post('/venue', venue_info)
  } catch (error) {
    console.log(error);
  }
}



  return (
  <div className='LoginPage'>

    <h1>Lo</h1>
    
      <form className='Form'>
        <input className='venue-element' type="text" placeholder="Name" name='Name' value={venue_info.Name} onChange={handleChange} />
        <input className='login-element' type="password" placeholder="Password" name='Password' value={login_info.Password} onChange={handleChange} />
        <button className='login-element' type="submit" onClick={handleSubmit}>Login</button>
      </form>
        
    
    
  </div>
  );
}

export default LoginPage;