import { NavLink } from "react-router-dom";

const HeaderComponent = () => {
    return (
    <div className="headerComponent bg-red-600 px-6 py-2 shadow-md">
        <div className="container mx-auto flex justify-between items-center text-yellow-300">
            <div className="flex gap-6">
                {/* TODO: Add image here */}
                <h1 className="text-3xl font-extrabold text-gray-100">PokéVault</h1>
            </div>
            <nav>
                <ul className="flex space-x-6 text-xl font-bold">
                    <li>
                        <NavLink to="/login" className=" text-lg hover:text-gray-100 transition">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" className=" text-lg hover:text-gray-100 transition">Register</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    )
}

export default HeaderComponent; 