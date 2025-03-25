import { NavLink } from "react-router-dom";
import {useLogout} from "../hooks/useLogout"; 
import { useAuthContext } from "../hooks/useAuthContext"; 

const HeaderComponent = () => {


    const {logout} = useLogout(); 
    const {user} = useAuthContext(); 
    
    const handleClick = () => {
        logout() 
    }

    return (
    <header className="headerComponent bg-red-600 px-6 py-2 shadow-md">
        <div className="container mx-auto flex justify-between items-center text-yellow-300">
            <div className="flex gap-6">
                <h1 className="text-3xl font-extrabold text-gray-100">PokéVault</h1>
            </div>
            <nav>
                {/* TODO: Remove the name? */}
                {user && (
                    <div className="flex gap-4">
                        <span className="text-lg font-bold">{user.first_name}</span>
                        <button className="bg-yellow-300 text-black px-4 text-lg font-bold rounded-lg" onClick={handleClick}>Logout</button>
                    </div>
                )}
                {!user && (
                    <ul className="flex space-x-6 text-xl font-bold">
                        <li>
                            <NavLink to="/login" className=" text-lg hover:text-gray-100 transition">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className=" text-lg hover:text-gray-100 transition">Register</NavLink>
                        </li>
                    </ul>
                )}
                
            </nav>
        </div>
    </header>
    )
}

export default HeaderComponent; 