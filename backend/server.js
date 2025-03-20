const express = require("express"); 
const connectDB = require("./config/db"); 
require("dotenv").config(); 


// Importing Routes 
const authRoutes = require("./routes/authRoutes")

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

const PORT = process.env.PORT || 5000; 
app.listen(PORT, ()=>console.log(`Connected & Running on Port: ${PORT}`))