import { createContext, useReducer, useEffect } from "react";

// Create context is used to create a context object that allows components to share state without passing props down manually at every level
export const AuthContext = createContext()

// A function that takes the current state and action and returns a new state based on action type
export const authReducer = (state, action) => {
    switch (action.type) {
        case `LOGIN`: 
            return {user: action.payload}
        case `LOGOUT`:
            return {user: null}
        default: 
            return state 
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))

        // If there is a user in local storage, then we are logged in 
        if (user) {
            dispatch({type: "LOGIN", payload: user})
        }
    }, [])

    console.log(`AuthContext State: ${state}`)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

