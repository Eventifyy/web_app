import express from 'express'
import { token_verification } from '../common_functions.js'
import {insert_Venue} from '../../model/database.js'


const router = express.Router()

router.use(token_verification);


router
.route('')
.post( async(req, res)=>{
    const {Name, Capacity, Address, Category} = req.body
    console.log(req.user)
    const result = await insert_Venue(Name, Capacity, Address, Category, req.user.id)
    res.send(result)
    
})
.put(async(req, res)=>{
    const {Name, Capacity, Address, Category} = req.body
    console.log(req.user)
    const result = await insert_Venue(Name, Capacity, Address, Category, req.user.id)
    res.send(result)
})


export default router;