import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useState, useRef } from "react";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import Copyright from "../components/Copyright";
import axios from "axios";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";


const ContactUs = () => {
    const [msg, setMsg] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [alertType, setAlertType] = useState('alert');
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await axios.post('http://localhost:8800/contact', JSON.stringify({email, message}),{
          headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
          setMsg(res.data)
          setMessage('');
          setEmail('');
          setAlertType('alert alert-success')
        })
      } catch(e) {
        setMsg('Réssayer encore une fois')
        setAlertType('alert alert-danger')
      }
      
    };
  return (
    <>
      <NavBar />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <ForwardToInboxIcon />
            </Avatar>
            <Typography p={3} component="h1" variant="h2">
                Get in touch
            </Typography>
            <Typography p={1} component="h2" variant="h5">
              We'd love to talk about how we can help you.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-multiline-flexible"
                required    
                fullWidth
                label="Message"
                multiline
                maxRows={8}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Envoyer
              </Button>
              <Grid container >
                <Grid item className="text-center">
                  <Link href="/about" variant="body2">
                    {"Know More About Us"}
                  </Link>
                </Grid>
              </Grid>
              <Grid>
                <Typography  className={alertType}  m={5} variant="body1" align="center">
                    {msg}
                </Typography>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ContactUs;
