const jwt = require("jsonwebtoken")
const User = require("../models/userModel"); 


const authMiddleware = async (req, res, next) => {

    // Verify authentication 
    const {authorization} = req.headers 

    if(!authorization) {
        return res.status(401).json({error: "Authorization token required!"})
    }

    // Getting the token and making sure that it is valid 
    const token = authorization.split(" ")[1] 

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select("_id")

        if(!req.user) {
            return res.status(401).json({error: "User not found!"})
        }

        return next(); 

    } catch (error) {
        console.error(error)
        return res.status(401).json({error: "Request is not authorized!"})
    }
}

module.exports = authMiddleware; 