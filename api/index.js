import express from 'express'
import cors from 'cors';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import login from './routes/Login.js'
import register from './routes/Register.js'
import venue from './routes/Venue.js'

dotenv.config()

const app = express()

app.use(cors());

app.use(express.json())



app.use('/register', register);

app.use('/login', login);

app.use('/venue', venue);





app.get('/Events', async(req, res)=>{
   

});




app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


app.listen(4000, () =>{
console.log('Server is listening on port 4000...')
});

