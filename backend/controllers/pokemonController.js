import Pokedex from 'pokedex-promise-v2';
import User from '../models/userModel.js';
const P = new Pokedex();

export const getPokemonByName = async (req, res) => {
    try {
        const {name} = req.params; 

        const pokemon = await P.getPokemonByName(name.toLowerCase())
        const species = await P.getPokemonSpeciesByName(name.toLowerCase())
        
        let evolvesFrom = null 

        // If the Pokemon evolves from another species 
        if(species.evolves_from_species) {
            const evolvesFromData = await fetch(species.evolves_from_species.url); 
            const evolvesFromSpecies = await evolvesFromData.json(); 
            evolvesFrom = evolvesFromSpecies.name; 
        }

        res.json({
            name: pokemon.name, 
            hp: pokemon.stats[0].base_stat, 
            height: pokemon.height, 
            weight: pokemon.weight,
            types: pokemon.types.map(t => t.type.name),
            sprite: pokemon.sprites.front_default, 
            evolves_from: evolvesFrom || "No evolution source"
        })

    } catch (error) {
        res.status(404).json({error: "Pokemon not found"}); 
    }
};

export const addToFavorites = async (req, res) => {
    try {
        const {pokemonName} = req.body; 
        const userId = req.user._id; 

        // Finding whether the user exists or not 
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({message: "User not found!"})
        }
        
        user.favorites = user.favorites || []; 

        if (user.favorites.includes(pokemonName)) {
            return res.status(400).json({message: "The pokemon is already in favorites"})
        }

        user.favorites.push(pokemonName); 
        await user.save(); 

        res.status(200).json({message: "Pokemon added to favorites", favorites: user.favorites})
    } catch (error) {
        console.error("Error adding to favorites:", error); 
        return res.status(500).json({error: error.message})
    }
};


export const getFavorites = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId).select("favorites")

        // Finding whether the user exists or not 
        if(!user) {
            return res.status(404).json({message: "User not found!"})
        }

        res.status(200).json({
            favorites: user.favorites || [], 
        })
    } catch (error) {
        console.error("Error retrieving favorites:", error); 
        return res.status(500).json({error: error.message}); 
    }
}
