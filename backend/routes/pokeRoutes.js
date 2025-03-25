import express from 'express';  
import { getPokemonByName } from '../controllers/pokemonController.js';

const router = express.Router(); 

// Get pokemon by name
router.get("/:name", getPokemonByName); 

export default router; 