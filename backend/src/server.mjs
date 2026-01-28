import express from "express"
import noteRoutes from './routes/notesRouter.mjs'
import dotenv from 'dotenv'
import { connectDB } from "./config/db.mjs";
import rateLimiter from "./middleware/ratelimiter.mjs";
import cors from 'cors'


dotenv.config();
const app=express();
const port=process.env.PORT||5001;


 app.use(cors(
    {
    origin:"http://localhost:5173"
    }
))


app.use(express.json());

app.use(rateLimiter);

app.use("/api/notes",noteRoutes)


connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server started on Port :${port}`)
    })
})

