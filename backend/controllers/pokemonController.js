import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

export const getPokemonByName = async (req, res) => {
    try {
        // TODO: Change this later
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

