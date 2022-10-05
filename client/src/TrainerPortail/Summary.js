import Box from "@mui/material/Box";
import Header from "./Shared/Header";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import { Grid, Button, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { editCoach, getCoachByEmail } from "../services/Trainer";
import useAuth from "../hooks/useAuth";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";

export default function Summary() {
  const auth = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebookAccount] = useState("");
  const [instagram, setInstagramAccount] = useState("");
  const [linkedin, setLinkedinAccount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [hourPrice, setHourPrice] = useState(0);
  const [skills, setSkills] = useState([]);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  useEffect(() => {
    getCoachByEmail(auth?.auth?.user).then((coach) => {
      setFirstName(coach[0]?.firstName);
      setLastName(coach[0]?.lastName);
      setPhoneNumber(coach[0]?.phoneNumber);
      setEmail(coach[0]?.email);
      setHourPrice(coach[0]?.hourPrice);
      setFacebookAccount(coach[0]?.socialMediaAccounts["facebook"]);
      setInstagramAccount(coach[0]?.socialMediaAccounts["instagram"]);
      setLinkedinAccount(coach[0]?.socialMediaAccounts["linkedin"]);
      setSkills(coach[0]?.skills);
    });
  }, []);

  const handleSubmit = () => {
    console.log(skills);
    getCoachByEmail(auth?.auth?.user)
      .then((data) => {
        const socialMediaAccounts = {
          facebook,
          instagram,
          linkedin,
        };
        return editCoach(data[0]?.id, {
          firstName,
          lastName,
          phoneNumber,
          email,
          hourPrice,
          socialMediaAccounts,
          skills,
        });
      })
      .then((response) => {
        if (response.status === 201) {
          setMessage("Sauvegadée ")
        } else {
          setSeverity('error');
          setMessage(" Invalide ");
        }
      });
  };
  return (
    <Box>
      <Header title="More About Me" />
      <Box m={5}>
        <Paper>
          <Box p={5}>
            <Grid container xs={12}>
              <Grid item xs={6} p={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="firstNameInput">First Name</InputLabel>
                  <Input
                    name="firstName"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    type="text"
                    id="firstNameInput"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} p={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="lastNameInput">Last Name</InputLabel>
                  <Input
                    name="lastName"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    type="text"
                    id="lastNameInput"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} p={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="emailInput">Email</InputLabel>
                  <Input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    id="emailInput"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} p={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="passwordInput">
                    Changer votre mot de passe
                  </InputLabel>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="passwordInput"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} p={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="phoneNumberInput">
                    Phone Number
                  </InputLabel>
                  <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="text"
                    id="phoneNumberInput"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} p={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="priceInput">Prix de l'heure</InputLabel>
                  <Input
                    value={hourPrice}
                    onChange={(e) => setHourPrice(e.target.value)}
                    type="number"
                    id="priceInput"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} p={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="instagramInput">
                    Instagram Account
                  </InputLabel>
                  <Input
                    value={instagram}
                    onChange={(e) => setInstagramAccount(e.target.value)}
                    type="text"
                    id="instgramInput"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} p={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="facebookInput">
                    Facebook Account
                  </InputLabel>
                  <Input
                    value={facebook}
                    onChange={(e) => setFacebookAccount(e.target.value)}
                    type="text"
                    id="facebookInput"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} p={4}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="linkedinInput">
                    Linkedin Account{" "}
                  </InputLabel>
                  <Input
                    value={linkedin}
                    onChange={(e) => setLinkedinAccount(e.target.value)}
                    type="text"
                    id="linkedinInput"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} p={4}>
                <Autocomplete
                  multiple
                  id="tags-filled"
                  options={[]}
                  freeSolo
                  value={skills}
                  onChange={(e, value) => setSkills(value)}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <>
                      <InputLabel>Skills</InputLabel>
                      <TextField {...params} variant="standard" />
                    </>
                  )}
                />
              </Grid>
            </Grid>
            <Box mt={5} sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                onClick={() => handleSubmit()}
                variant="contained"
                color="primary"
              >
                Sauvegarder
              </Button>
            </Box>
            <Box display={message ? 'flex' : 'none'} justifyContent="center">
              <Alert severity={severity}>{message}</Alert>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
