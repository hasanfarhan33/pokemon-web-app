import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';


const HomePage = () => {

    const {user} = useAuthContext(); 

    // For suggestions 
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]); 
    const [allPokemon, setAllPokemon] = useState([]); 
    const [pokemonDetails, setPokemonDetails] = useState(); 
    
    // Fetch pokemon names on load 
    useEffect(() => {
        const fetchPokemonNames = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
                const data = await response.json(); 
                const names = data.results.map((pokemon) => pokemon.name);  
                setAllPokemon(names); 
            } catch (error) {
                console.error("Failed to fetch Pokemon names:", error); 
            }
        }; 

        fetchPokemonNames(); 

    }, []); 

    // Handle input change and filter pokemon names 
    const handleChange = (e) => {
        const value = e.target.value.toLowerCase(); 
        setSearch(value); 

        if (value === "") {
            setSuggestions([])
        } else {
            const filtered = allPokemon.filter((name) => name.includes(value)).splice(0, 5);
            setSuggestions(filtered);  
        }
    }; 

    // Handle selecting pokemon from the suggestions 
    const handleSelect = async (name) => {
        setSearch(name); 
        setSuggestions([]); 
        
        try {
            const response = await fetch(`/api/pokeapi/${name}`)
            const data = await response.json();
            
            console.log(data);
            setPokemonDetails(data); 
        } catch (error) {
            console.error("Error fetching pokemon details:", error)
        }
    }; 


    return (
    <main className='min-h-screen p-6 flex items-center flex-col font-press'>
        <div className='formContainer bg-yellow-300 p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h1 className="text-2xl font-extrabold">Hello, Trainer <span className='text-red-600'>{user.first_name}</span>!</h1>
            <h3 className='text-lg font-medium mb-8'>What Pokemon Do You Want to Learn About?</h3>
            <input className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-xs' placeholder='Search Pokemon...' onChange={handleChange} value={search}></input>   

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
                <ul className='w-full bg-gray-100 border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto'> 
                    {suggestions.map((name) => (
                        <li key={name} onClick={() => handleSelect(name)} className='cursor-pointer px-4 py-2 hover:bg-gray-200'>{name}</li>
                    ))}
                </ul>
            )}
        </div>

        {/* TODO: Add the pokemon details div here */}
        
    </main>
    )
}

export default HomePage;  