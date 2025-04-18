import mongoose from "mongoose"; 
import dotenv from "dotenv"

dotenv.config(); 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        }); 
    
        console.log(`MongoDB Connected: ${conn.connection.host}`);    
    } catch (error) {
        console.error("Could not connect to DB: ", error.message); 
        process.exit(1);    
    }
}; 

export default connectDB; 