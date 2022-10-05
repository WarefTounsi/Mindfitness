import { useState } from "react"
import useAuth from "./useAuth"

const useToken = () => {
    const { setAuth } = useAuth()
    const token = JSON.parse(sessionStorage.getItem('auth'));
    return token
} 

export default useToken