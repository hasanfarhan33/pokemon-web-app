import { useAuthContext } from "./useAuthContext";

export const useUpdateFavorites = () => {
    const {dispatch} = useAuthContext(); 

    const updateFavorites = (newFavorites) => {
        dispatch({
            type: "UPDATE_FAVORITES", 
            payload: newFavorites
        })

        const user = JSON.parse(localStorage.getItem("user")); 
        localStorage.setItem("user", JSON.stringify({...user, newFavorites}))
    }

    return { updateFavorites}; 
}