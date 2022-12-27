import {
  Grid,
  Paper,
  Box,
  Input,
  Typography,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { getUserByEmail, updateUser } from "../services/user";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { getUserEmail } from "../services/LocalStorage";

const Profile = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = () => {
    const data = {
      firstName: name,
      lastName: lastName,
    };
    const email = JSON.parse(sessionStorage.getItem("auth"))["user"];
    updateUser(email, data)
      .then((data) => setIsOpen(true))
      .catch((err) => console.log("error"));
  };
  useEffect(() => {
    getUserByEmail(getUserEmail()).then((user) => {
      setLastName(user[0]?.lastName)
      setName(user[0]?.firstName)
    })
  },[])
  return (
    <Box>
      <Paper sx={{ backgroundColor: "#745FEA", padding: 5, marginBottom: 5 }}>
        <Typography variant="h3">Profile</Typography>
      </Paper>
      <Paper sx={{ padding: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>First Name</InputLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Last Name</InputLabel>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "inline-flex",
              justifyContent: "center",
              marginTop: 5,
            }}
          >
            <Button onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={isOpen}
        color="success"
        autoHideDuration={3000}
      >
        <Alert severity="success">updated successfully!</Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
