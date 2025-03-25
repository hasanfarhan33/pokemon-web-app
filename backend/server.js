import express from 'express';  
import connectDB from "./config/db.js";  
import dotenv from "dotenv" 

dotenv.config(); 

// Importing Routes 
import authRoutes from "./routes/authRoutes.js"
import pokeRoutes from "./routes/pokeRoutes.js"

connectDB(); 

const app = express(); 

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next(); 
})

// Routes 
app.use("/api/auth", authRoutes); 
app.use("/api/pokeapi", pokeRoutes); 

const PORT = process.env.PORT || 5000; 
app.listen(PORT, ()=>console.log(`Connected & Running on Port: ${PORT}`))