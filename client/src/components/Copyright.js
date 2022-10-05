import Typography from "@mui/material/Typography"
import { Link } from "@mui/material";

export default function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="http://localhost:3000/home">
          MindFitness
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }