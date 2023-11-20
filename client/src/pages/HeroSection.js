import {Box, Card, Typography, CardContent, CardMedia } from "@mui/material";

export default function HeroSection(props) {
  return (
    
    <Box >
      <Card className="rounded-5" sx={{p:5, backgroundColor: '#E7F5FE',  display: "flex" }}>
        <CardContent sx={{width: '80%'}}>
          <Typography color='#00000' p={2} align="center" variant="h6">
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
