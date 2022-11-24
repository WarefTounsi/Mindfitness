import {
  Grid,
  Paper,
  Box,
  Input,
  Typography,
  FormControl,
  InputLabel,
  Button
} from "@mui/material";

const Profile = () => {
  
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
              <Input />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Last Name</InputLabel>
              <Input />
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{display: 'inline-flex', justifyContent:'center',marginTop:5}}>
            <Button variant="contained" >Submit</Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
