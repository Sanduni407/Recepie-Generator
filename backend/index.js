import dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import cors from 'cors'
import connectDB from './models/dbConnection.js'; 

import UserRouter from './routes/authRouter.js'
import Reciperouter from './routes/recipeRouter.js';




const app = express()


const PORT = process.env.PORT || 8080;


connectDB();

app.use(express.json());
app.use(cors());




app.use('/auth', UserRouter)

app.use("/recipes", Reciperouter);






app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
})