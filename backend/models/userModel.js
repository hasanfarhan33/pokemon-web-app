const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name: {
        type: String, 
        required: true, 
        trim: true, 
    }, 

    last_name: {
        type: String, 
        required: true,
        trim: true
    },
    
    email: {
        type: String, 
        required: true, 
        unique: true,
        trim: true
    }, 

    password: {
        type: String, 
        required: true
    }, 

    favorites: {
        type: [String], 
        required: false, 
        default: []  
    }, 

}, {timestamps: true})

// Static register method 
userSchema.statics.register = async function(first_name, last_name, email, password) {
    // Make sure all the fields are provided 
    if (!first_name || !last_name || !email || !password) {
        throw Error("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("The email is not valid"); 
    }

    if(!validator.isStrongPassword(password)) {
        throw Error("The password is not strong enough")
    }

    // Check if the email already exists 
    const exists = await this.findOne({email})
    if(exists) {
        throw Error("The email is already in use")
    }

    // Encrypting the password 
    const salt = await bcrypt.genSalt(10); 
    const hash = await bcrypt.hash(password, salt); 

    // Creating the user in the DB 
    const user = await this.create({first_name, last_name, email, password: hash}); 

    return user
}

// Static login method 
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error("All fields must be entered")
    }

    // Check if the email already exists
    const user = await this.findOne({email})

    if(!user) {
        throw Error("Incorrect Email")
    }

    // Check if the password is correct 
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error("Incorrect Password"); 
    }

    return user
}

module.exports = mongoose.model("User", userSchema)