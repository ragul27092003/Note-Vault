import express from "express"
import noteRoutes from './routes/notesRouter.mjs'
import dotenv from 'dotenv'
import { connectDB } from "./config/db.mjs";
import rateLimiter from "./middleware/ratelimiter.mjs";
import cors from 'cors'
import path from 'path'

dotenv.config();
const app=express();
const port=process.env.PORT||5001;
const __dirname=path.resolve();

if(process.env.NODE_ENV!=="production"){
 app.use(cors(
    {
    origin:"http://localhost:5173"
    }
))
}

app.use(rateLimiter);
app.use(express.json());
app.use("/api/notes",noteRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.use((req, res) => {
        res.sendFile(
            path.join(__dirname, "../frontend/dist/index.html")
        );
    });
}

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server started on Port :${port}`)
    })
})

