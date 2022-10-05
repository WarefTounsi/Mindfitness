import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function Header(props) {
  return (
    <Paper>
      <Typography p={5} align="center" className="border border-1 border-primary" variant="h3">
        {props.title}
      </Typography>
    </Paper>
  );
}
