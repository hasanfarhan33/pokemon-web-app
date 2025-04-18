import { useState } from "react"
import { useRegister } from "../hooks/useRegister"
import * as motion from "motion/react-client"

const RegisterPage = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // This is a custom hook 
    const {register, isLoading, error, success} = useRegister();
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        await register(firstName, lastName, email, password)
    }

    return (
        <main className="min-h-screen p-6 flex items-center flex-col font-press">
            <div className="text-center mb-8">
                <h1 className="text-2xl">Open Your PokeVault here!</h1>
            </div>

            {/* Register form container */}
            <div className="formContainer bg-yellow-300 p-8 rounded-lg shadow-lg w-full max-w-md">
                <form className="grid grid-cols-[1fr_2fr] gap-y-2 items-center text-sm" onSubmit={handleSubmit}>
                    {/* First Name */}
                    <label htmlFor="firstName" className="block text-black font-medium">First Name:</label>
                    <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="John" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-xs"></input>

                    {/* Last Name */}
                    <label htmlFor="lastName" className="block text-black font-medium">Last Name:</label>
                    <input type="text" placeholder="Doe" onChange={(e) => setLastName(e.target.value)} value={lastName} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-xs"></input>

                    {/* Email */}
                    <label htmlFor="email" className="block text-black font-medium">Email:</label>
                    <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-xs"></input>

                    {/* Password */}
                    <label htmlFor="password" className="block text-black font-medium">Password:</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter your password"className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-xs"></input>

                    <div className="col-span-2">
                        <motion.button className="mt-8 w-full bg-red-600 text-white py-2 rounded-lg font-semibold" disabled={isLoading} whileHover={{scale:1.05}} whileTap={{scale:0.95}}>Register</motion.button>
                    </div>

                    {error && <div className="errorMessage text-red-600 font-medium col-span-2">{error}</div>}
                    {success && <div className="successMessage text-black font-medium col-span-2">{success}</div>}

                </form>

            </div>
        </main>
    )
}

export default RegisterPage; 