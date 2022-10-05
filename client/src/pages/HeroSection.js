import {Box, Card, Typography, CardContent, CardMedia } from "@mui/material";

export default function HeroSection(props) {
  return (
    
    <Box >
      <Card className="rounded-5" sx={{p:5, backgroundImage:"linear-gradient(to right top, #016fb9, #1362a0, #1a5489, #1e4771, #1e3b5b);",  display: "flex" }}>
        <CardContent sx={{width: '80%'}}>
          <Typography color='#CAC4CE' p={2} align="center" variant="h6">
            {props.description}
          </Typography>
        </CardContent>
        <CardMedia
          sx={{ height: 300, width: 300 }}
          image={props.imagePath}
          alt="trainer_logo"
        ></CardMedia>
      </Card>
    </Box>
      
  );
}
