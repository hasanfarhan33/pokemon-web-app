import User from "../models/userModel.js"
import jwt from "jsonwebtoken";

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'}); 
}

// Login User 
export const loginUser = async (req, res) => {
    const {email, password} = req.body; 
    
    try {
        const user = await User.login(email, password) 
        const token = createToken(user._id);
        res.status(200).json({
            _id: user._id, 
            first_name: user.first_name, 
            last_name: user.last_name, 
            email: user.email, 
            token: token
        }) 
    } catch (error) {
        res.status(400).json({error: error.message}); 
    }
}

// Register User 
export const registerUser = async (req, res) => {
    const {first_name, last_name, email, password} = req.body; 

    try {
        const user = await User.register(first_name, last_name, email, password)

        // Create token 
        const token = createToken(user._id); 
        
        res.status(201).json({
            _id: user._id, 
            first_name: user.first_name,
            last_name: user.last_name, 
            email: user.email,
            token: token
        }); 
    } catch (error) {
        res.status(400).json({error: error.message}); 
    }
}