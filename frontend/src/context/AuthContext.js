import { createContext, useReducer, useEffect } from "react";

// Create context is used to create a context object that allows components to share state without passing props down manually at every level
export const AuthContext = createContext()

// A function that takes the current state and action and returns a new state based on action type
export const authReducer = (state, action) => {
    switch (action.type) {
        case `LOGIN`: 
            return {...state, user: action.payload}
        case `LOGOUT`:
            return {...state, user: null}
        
        // Updating the favorites
        case `UPDATE_FAVORITES`:
            return {
                ...state, 
                user: {...state.user, favorites: action.payload}
            }
        // Setting favorites when we refresh the page 
        case `SET_FAVORITES`: 
            return {
                ...state, 
                user: {...state.user, favorites: action.payload}
            }
        default: 
            return state 
    }
}

// !FIX THIS SHIT
// TODO: FIX THIS SHIT
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: JSON.parse(localStorage.getItem("user")) || null,
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))

        // If there is a user in local storage, then we are logged in 
        if (user) {
            const fetchUpdatedUserData = async () => {
                try {
                    const response = await fetch(`/api/users/${user._id}`, {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    });

                    const updatedUser = await response.json(); 
                    if(response.ok) {
                        // Update the user in localStorage and dispatch the action 
                        localStorage.setItem("user", JSON.stringify(updatedUser)); 
                        dispatch({type: "LOGIN", payload: updatedUser}); 
                    } else {
                        console.error("Failed to fetch updated user data"); 
                    }
                } catch (error) {
                    console.error("Error fetching updated user data")
                }
            }

            fetchUpdatedUserData(); 
        }
    }, []); 

    const updateFavoriteInLocalStorage = (newFavorites) => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            user.favorites = newFavorites; 
            localStorage.setItem("user", JSON.stringify(user)); 
        }
    }

    const handleFavoritesUpdate = (newFavorites) => {
        updateFavoriteInLocalStorage(newFavorites); 

        dispatch({type: "UPDATE_FAVORITES", payload: newFavorites})
    }

    // console.log(`AuthContext State: ${state}`)

    return (
        <AuthContext.Provider value={{...state, dispatch, handleFavoritesUpdate}}>
            {children}
        </AuthContext.Provider>
    )
}

