import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
const Layout = () => {
    const location = useLocation()
    const navigate = useNavigate('/from')
  useEffect(() =>{
    if(location.pathname =='/') {
        navigate('/home')
    }
  },[])
    return (
        <main className="App" >
            <Outlet />
        </main>
    )
}

export default Layout
