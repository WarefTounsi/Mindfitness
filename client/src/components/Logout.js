import { useEffect } from "react";
import { Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Logout = () => {
    const { setAuth } = useAuth();
    useEffect(() => {
        sessionStorage.removeItem('auth')
        setAuth({});
    },[])
    return (
        <Navigate to='/home'  />
    )
}
export default Logout
