import { useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';


const HomePage = () => {

    const {user} = useAuthContext(); 

    return (
    <main className='min-h-screen p-6 flex items-center flex-col'>
        <div className='formContainer bg-yellow-300 p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h1 className="text-4xl font-extrabold">Hello, Trainer <span className='text-red-600'>{user.first_name}</span>!</h1>
            <h3 className='text-2xl font-bold mb-8'>What Pokemon Do You Want to Learn About?</h3>
            <form className='grid grid-cols-[2fr_1fr] gap-x-2'> 
                <input type='text' className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"></input>
                <button className='bg-red-600 text-white py-2 px-2 rounded-lg font-semibold hover:bg-red-700 transition'>Search</button>
            </form>
        </div>
        
    </main>
    )
}

export default HomePage;  