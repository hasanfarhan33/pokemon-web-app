import express from 'express';  
import { getPokemonByName, addToFavorites, getFavorites } from '../controllers/pokemonController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router(); 
 
// Protecting the routes
router.use(authMiddleware); 

// Get pokemon by name
router.get("/:name", getPokemonByName); 
router.post("/favorites/add", addToFavorites)
router.get("/favorites/get/:userId", getFavorites)

export default router; 