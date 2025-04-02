import express from 'express';  
import { getPokemonByName, addToFavorites, getFavorites, removePokemon } from '../controllers/pokemonController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router(); 
 
// Protecting the routes
router.use(authMiddleware); 

router.get("/:name", getPokemonByName); 
router.post("/favorites/add", addToFavorites)
router.get("/favorites/get/:userId", getFavorites)
router.delete("/favorites/remove/:userId/:pokemonName", removePokemon)


export default router; 