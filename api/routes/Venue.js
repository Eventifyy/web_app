import express from 'express'
import { token_verification } from '../common_functions.js'
import {insert_Venue, get_Venue} from '../../model/database.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';


const router = express.Router()

//router.use(cookieParser());
router.use(token_verification);



router
.route('')
.post( async(req, res)=>{
    const {Name, Capacity, Address, Category} = req.body
    console.log(req.user)
    try{
    const result = await insert_Venue(Name, Capacity, Address, Category, req.user.id)
    res.send({ status: "success"})
    }
    catch(e){
    res.send({ status: "failure"})
    }
    
    
})
.put(async(req, res)=>{
    const {Name, Capacity, Address, Category} = req.body
    console.log(req.user)
    const result = await insert_Venue(Name, Capacity, Address, Category, req.user.id)
    res.send(result)
})


router.route('/list').post(async (req, res) => {
  try {
    const { pageNumber, pageSize } = req.body; // Assuming pageNumber is passed as a query parameter
    
    if (isNaN(pageNumber)) {
      res.status(400).json({ error: 'Invalid pageNumber parameter' });
      return;
    }

    // Assuming get_Venue supports pagination and returns data based on pageNumber
    const result = await get_Venue(pageNumber, pageSize);
    res.send(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;