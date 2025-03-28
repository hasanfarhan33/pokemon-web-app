import { useAuthContext } from "./useAuthContext";

export const useSetFavorites = () => {
    const {dispatch} = useAuthContext(); 

    const setFavorites = (newFavorites) => {
        dispatch({
            type: "SET_FAVORITES", 
            payload: newFavorites
        })

        const user = JSON.parse(localStorage.getItem("user")); 
        localStorage.setItem("user", JSON.stringify({...user, newFavorites})); 
    }

    return {setFavorites}; 
}