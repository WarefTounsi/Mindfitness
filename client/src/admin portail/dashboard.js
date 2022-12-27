import { Paper, Typography, Box } from "@mui/material";
import { Button, Link } from "react-admin";

export const Dashboard = () => {
  return (
    <Paper elevation={5} sx={{ marginTop: 5, padding: 8 }}>
      <Typography
        variant="h3"
        sx={{ padding: 2, borderBottom: "2px solid blue", textAlign: "center" }}
      >
        Here you can administrate your app
      </Typography>
      <Box sx={{ marginTop: 5, display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined">
          <Link to={"/home"}>Return to Home</Link>
        </Button>
      </Box>
    </Paper>
  );
};
