import {
  Grid,
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
      setLastName(user[0]?.lastName);
      setName(user[0]?.firstName);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h3" sx={{ color: "#354f52", marginBottom: 3 }}>
        Edit Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ paddingRight: 2 }}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: "#354f52", fontSize: "1rem" }}>
              First Name
            </InputLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                color: "#354f52",
                fontSize: "1.2rem",
                borderRadius: "8px",
                border: "2px solid #ccc",
                padding: "16px", // Adjusted padding
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Added subtle box shadow
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sx={{ paddingLeft: 2 }}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: "#354f52", fontSize: "1rem" }}>
              Last Name
            </InputLabel>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{
                color: "#354f52",
                fontSize: "1.2rem",
                borderRadius: "8px",
                border: "2px solid #ccc",
                padding: "16px", // Adjusted padding
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Added subtle box shadow
              }}
            />
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: 5,
          }}
        >
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#1976D2",
              color: "#fff",
              fontSize: "1.2rem",
              padding: "14px 24px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#1976D2" },
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={isOpen} color="success" autoHideDuration={3000}>
        <Alert severity="success">Updated successfully!</Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
