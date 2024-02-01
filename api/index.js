import express from 'express'
import cors from 'cors';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import login from './routes/Login.js'
import register from './routes/Register.js'
import venue from './routes/Venue.js'
import { token_verification } from './common_functions.js';

dotenv.config()

const app = express()
app.use(cors( {origin: 'http://localhost:5000',
  credentials: true,
  secure: true}));

app.use(cookieParser());
app.use(express.json())


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  next();
});

app.use('/register', register);

app.use('/login', login);

app.use('/venue', venue);


app.get('/Events', async(req, res)=>{
   

});

app.get("/", (req, res) => {
  
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})


app.listen(4000, () =>{
console.log('Server is listening on port 4000...')
});

