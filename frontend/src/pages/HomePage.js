import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import * as motion from "motion/react-client"
import { useUpdateFavorites } from '../hooks/useUpdateFavorites';
import { useSetFavorites } from '../hooks/useSetFavorites';

const HomePage = () => {

    const {user} = useAuthContext(); 
    const {updateFavorites} = useUpdateFavorites(); 
    const {setFavorites} = useSetFavorites(); 

    // For suggestions 
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]); 
    const [allPokemon, setAllPokemon] = useState([]); 
    const [pokemonDetails, setPokemonDetails] = useState(); 
    // TODO: Add a loading animation
    const [isLoading, setIsLoading] = useState(false); 
    const [message, setMessage] = useState(""); 

    // Fetch pokemon names on load 
    useEffect(() => {
        const fetchPokemonNames = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
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
        setIsLoading(true); 
        
        try {
            const response = await fetch(`/api/pokeapi/${name}`, {
                method: "GET", 
                headers: {
                    Authorization: `Bearer ${user.token}`, 
                },
            })
            const data = await response.json();
            
            setPokemonDetails(data); 
            setMessage("");         // Resetting the message

        } catch (error) {
            setIsLoading(false); 
            console.error("Error fetching pokemon details:", error)
        } finally {
            setSearch(""); 
            setIsLoading(false); 
        }
    }; 

 
    const handleAddFavorite = async () => {

        // Making sure the user is logged in 
        if (!user) {
            alert("You must be logged in to save favorites!")
            return; 
        }

        try {
            const response = await fetch("/api/pokeapi/favorites/add", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${user.token}`
                }, 
                body: JSON.stringify({pokemonName: pokemonDetails.name})
            }); 

            const data = await response.json(); 
            
            if (!response.ok) throw new Error(data.message); 

            const updatedFavorites = [...user.favorites, pokemonDetails.name]
            updateFavorites(updatedFavorites); 
            setFavorites(updatedFavorites); 

            setMessage("Successfully added to favorites!")
            
        } catch (error) {
            setMessage(error.message)
            console.error("Error adding favorite:", error.message)   
        }
    }

    const isFavorite = user.favorites && user.favorites.includes(pokemonDetails?.name)

    return (
    <main className='min-h-screen p-6 flex items-center flex-col font-press'>
        <div className='formContainer bg-yellow-300 p-8 rounded-lg shadow-lg w-full max-w-md mb-8'>
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

        {pokemonDetails && (
            <motion.div className="flex-col bg-yellow-300 font-press rounded-lg p-8 shadow-lg w-full max-w-md" 
                initial = {{opacity: 0, scale: 0}}
                animate = {{ opacity: 1, scale: 1}}
                transition = {{
                    duration: 0.4, 
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5}
                }}
            >
                <div className='imageAndNameContainer flex items-center justify-around'>
                    <img src={pokemonDetails.sprite} alt={pokemonDetails.name}></img>
                    <h3 className='text-xl'>{pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}</h3>
                </div>
                <div className='informationGridContainer grid grid-cols-2 text-sm gap-y-2'>
                    <p>Type(s):</p>
                    <p>{pokemonDetails.types.join(" ")}</p>

                    <p>HP:</p>
                    <p>{pokemonDetails.hp}</p>

                    <p>Height:</p>
                    <p>{pokemonDetails.height / 10} m</p>

                    <p>Weight:</p>
                    <p>{pokemonDetails.weight / 10} kg</p>

                    <p>Evolves From:</p>
                    <p>{pokemonDetails.evolves_from.charAt(0).toUpperCase() + pokemonDetails.evolves_from.slice(1)}</p>
                    
                    {/* Conditional button */}
                    {!isFavorite ? (
                            <motion.button 
                                className='col-span-2 bg-red-600 mt-8 py-2 px-4 rounded-lg text-gray-100' 
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.95 }} 
                                onClick={handleAddFavorite}
                            >
                                Add to Favorites
                            </motion.button>
                        ) : (
                            <motion.button 
                                className='col-span-2 bg-red-600 mt-8 py-2 px-4 rounded-lg text-gray-100 cursor-not-allowed' 
                                disabled
                            >
                                Already in Favorites
                            </motion.button>
                        )}
                </div>

                {message && <p className='col-span-2 mt-4 text-center font-bold text-red-600 text-sm'>{message}</p>}

            </motion.div>
        )}

        {/* TODO: Add a div to browse favorite pokemons */}
        
        
    </main>
    )
}

export default HomePage;  