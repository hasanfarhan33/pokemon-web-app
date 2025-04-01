import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"
import vaultImage from "../assets/pokeVault.png"; 
import * as motion from "motion/react-client"

// Adding the loading component 
import LoadingComponent from "../components/LoadingComponent";

const VaultPage = () => {
    const {user} = useAuthContext();   

    const [isLoading, setIsLoading] = useState(false);
    const [favorites, setFavorites] = useState([]); 
    const [favoriteDetails, setFavoriteDetails] = useState([]); 

    // Fetch favorite pokemons 
    useEffect(() => {
        const userId = user._id; 
        const getFavoritePokemons = async () => {
            
            try {
                const response = await fetch(`/api/pokeapi/favorites/get/${userId}`, {
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json", 
                        Authorization: `Bearer ${user.token}`
                    }, 
                })
                
                const data = await response.json(); 
                // console.log("Fetched favorites:", data.favorites)
    
                if(!response.ok) {
                    setFavorites([])
                    throw new Error(data.message)
                }

                setFavorites(data.favorites) 

            } catch (error) {
                console.error("Couldn't get favorites", error.message); 
            }
        }

        getFavoritePokemons(); 

    }, [user])

    // Fetch details for each Pokemon 
    useEffect(() => {
        if (!favorites || favorites.length === 0) return; 

        const fetchPokemonDetails = async () => {
            setIsLoading(true); 
            try {
                const details = await Promise.all(
                    favorites.map(async (name) => {
                        const response = await fetch(`/api/pokeapi/${name}`, {
                            method: "GET", 
                            headers: {
                                Authorization: `Bearer ${user.token}`
                            }
                        }); 
                        const data = await response.json(); 
                        return data; 
                    })
                )

                setFavoriteDetails(details)
            } catch (error) {
                console.error("Could not fetch favorite Pokemon details", error.message); 
            } finally {
                setIsLoading(false); 
            }
        }

        fetchPokemonDetails(); 
    }, [favorites])

    return (
        <main className="min-h-screen p-6 flex items-center flex-col font-press">
            {isLoading ? (
                <LoadingComponent></LoadingComponent>
            ) : favorites.length === 0 ? (
                <div className="flex flex-col justify-center items-center">
                    <img src={vaultImage} alt="Vault" className="h-32 w-32"></img>
                    <h3 className="mb-8">There are no Pokemon in your vault!</h3>
                    <a className="hover:text-red-600 hover:underline transition" href="/">&#8592; Go Back!</a>
                </div>
            ) : (
                <>
                    <div className="flex flex-col justify-center items-center gap-2 mb-8">
                        <img src={vaultImage} alt="Vault" className="w-32 h-32"></img>
                        <h3 className="text-2xl font-bold text-center">Your Vault!</h3>
                    </div>
                    {favoriteDetails.map((pokemon) => (
                        <motion.div key={pokemon.name} className="flex flex-col bg-yellow-300 rounded-lg p-8 shadow-lg w-full max-w-md m-4"
                            initial = {{opacity: 0, scale: 0}}
                            animate = {{opacity: 1, scale: 1}}
                            transition={{
                                duration: 0.4, 
                                scale: {type: "spring", visualDuration: 0.4, bounce: 0.3}
                            }}
                            whileHover = {{scale: 1.025}}
                        >
                            <div className="flex items-center justify-around">
                                <img src={pokemon.sprite} alt={pokemon.name}></img>
                                <p className="text-center">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                            </div>
                            <div className="grid grid-cols-2 text-sm gap-y-2">
                                <p>Type(s):</p>
                                <p>{pokemon.types.join(" ")}</p>

                                <p>Height:</p>
                                <p>{pokemon.height / 10} m</p>

                                <p>Weight:</p>
                                <p>{pokemon.weight / 10} kg</p>

                                <p>Evolves From:</p>
                                <p>{pokemon.evolves_from ? pokemon.evolves_from.charAt(0).toUpperCase() + pokemon.evolves_from.slice(1) : "None"}</p>

                                {/* TODO: Add functionality later */}
                                <button className="col-span-2 bg-red-600 mt-8 py-2 px-4 rounded-lg text-gray-100">
                                    Remove From Vault
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    <div className="mt-8">
                        <a href="/" className="hover:text-red-600 hover:underline transition">&#8592; Return to Home Page!</a>
                    </div>
                </>
            )}
            
        </main>
    )
}

export default VaultPage; 