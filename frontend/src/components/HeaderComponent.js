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
                <h1 className="font-press text-xl font-bold text-gray-100">PokéVault</h1>
            </div>
            <nav>
                {/* TODO: Remove the name? */}
                {user && (
                    <div className="flex gap-4 font-press">
                        <span className="flex justify-center items-center text-sm">{user.first_name}</span>
                        <button className="bg-yellow-300 text-black px-4 py-2 text-sm rounded-lg hover:bg-yellow-500 transition" onClick={handleClick}>Logout</button>
                    </div>
                )}
                {!user && (
                    <ul className="flex space-x-6 font-press">
                        <li>
                            <NavLink to="/login" className=" text-sm hover:text-gray-100 hover:underline transition">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className=" text-sm hover:text-gray-100 hover:underline transition">Register</NavLink>
                        </li>
                    </ul>
                )}
                
            </nav>
        </div>
    </header>
    )
}

export default HeaderComponent; 