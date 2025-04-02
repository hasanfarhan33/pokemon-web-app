import { useState } from "react";
import {useLogin} from "../hooks/useLogin"
import * as motion from "motion/react-client"

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const[password, setPassword] = useState(""); 
    const {login, isLoading, error} = useLogin(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        await login(email, password)
    }

    return (
        <main className="min-h-screen p-6 flex items-center flex-col">
            <div className="text-center mb-8 font-press">
                <h1 className="text-2xl text-black">PokéVault</h1>
                <h3 className="text-md text-black">Search and store your favorite Pokémon!</h3>
            </div>

            {/* Form container */}
            <div className="formContainer bg-yellow-300 p-8 rounded-lg shadow-lg w-full max-w-md font-press">
                <form className="grid grid-cols-[1fr_2fr] gap-y-2 items-center text-sm" onSubmit={handleSubmit}>
                    {/* Email */}
                    <label htmlFor="email" className="block text-black">Email: </label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} id="email" placeholder="Enter your email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-xs"></input>
                    
                    {/* Password */}
                    <label htmlFor="password" className="block text-black font-medium">Password: </label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} id="password" placeholder="Enter your password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-xs"></input>
                    
                    <div className="col-span-2">
                        <motion.button className="mt-8 w-full bg-red-600 text-white py-2 rounded-lg font-semibold" disabled={isLoading} whileHover={{ scale: 1.05}} whileTap={{scale: 0.8}}>Login</motion.button>
                    </div>

                    {error && <div className="errorMessage text-red-600 font-medium col-span-2">{error}</div>}
                    
                </form>
                <p className="text-center text-black mt-4">Don't have an account? <a href="/register" className="text-blue-600 font-semibold hover:underline transition">Register!</a></p>
            </div>
        </main>
    )
}

export default LoginPage; 