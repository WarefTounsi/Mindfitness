import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useEffect } from "react";
import { IconButton } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function NavBar() {
  const navigate = useNavigate()
  const { auth } = useAuth();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("auth"))?.user) {
      setIsLogged(true);
      console.log(isLogged);
    }
  }, []);

  return (
    <AppBar position="fixed" color="primary" elevation={3}>
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography
          href="/home"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          MindFitness
        </Typography>
        <nav>
          <Link
            underline="none"
            variant="button"
            color="#FFFFFF"
            href="/home"
            sx={{ my: 1, mx: 1.5 }}
          >
            Home
          </Link>
          <Link
            underline="none"
            variant="button"
            color="#FFFFFF"
            href="/trainer"
            sx={{ my: 1, mx: 1.5 }}
          >
            Our Trainers
          </Link>
          <Link
            underline="none"
            variant="button"
            color="#FFFFFF"
            href="/training"
            sx={{ my: 1, mx: 1.5 }}
          >
            Our Trainings
          </Link>
          <Link
            underline="none"
            variant="button"
            color="#FFFFFF"
            href="/about"
            sx={{ my: 1, mx: 1.5 }}
          >
            About Us
          </Link>
          <Link
            underline="none"
            variant="button"
            color="#fff"
            href="/contact-us"
            sx={{ my: 1, mx: 1.5 }}
          >
            Contact Us
          </Link>
          <Button
            href="/login"
            variant="outlined"
            className={isLogged ? "d-none" : ""}
            color="error"
            sx={{ my: 1, mx: 1.5 }}
          >
            Login
          </Button>
          <Button
            href="/logout"
            variant="outlined"
            className={!isLogged ? "d-none" : ""}
            color="error"
            sx={{ my: 1, mx: 1.5 }}
          >
            Logout
          </Button>
          <AccountCircleIcon fontSize="large" onClick={() => {navigate("/user-profile")}}/>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
