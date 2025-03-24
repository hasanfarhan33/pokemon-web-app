import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(""); 
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const register = async (first_name, last_name, email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("/api/auth/register", {
            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({first_name, last_name, email, password})
        })

        const json = await response.json(); 

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            // Save the user to local storage 
            localStorage.setItem("user", JSON.stringify(json))

            dispatch({type: "LOGIN", payload: json})

            setIsLoading(false)
            setSuccess("Registration Successful! You can login now!")
        }
    }

    return {register, isLoading, error, success}
}