import React from "react";
import { Grid, Box ,  Typography, Container, Button } from "@mui/material";
import { Card, CardContent, CardMedia } from "@mui/material";
import HeroSection from "./HeroSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";  
const About = () => {

  return (
    <>
      <Navbar />
      <Container mt={5}>
        <Grid m={5} align="center">
          <Box p={2} >
          <Typography
            m={5}
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Know More About Us
          </Typography>
          </Box>
          
          <Typography
            m={5}
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.&apos; Something short
            and leading about the collection below—its contents, the creator,
            etc. Make it short and sweet, but not too short so folks don&apos;t
            simply skip over it entirely.
          </Typography>
          <Grid
            container
            align="center"
            justifyContent="center"
            direction="row"
          >
            <Grid item p={3}>
              <Button href="/register" variant="contained" color="primary">
                Join Us
              </Button>
            </Grid>
            <Grid item p={3}>
              <Button href="/contact-us" variant="outlined" color="primary">
                Contact Us
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Grid p={5} >
            <Section
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              title="Our Story"
              image="our_story.png"
              />
          </Grid>
          <Grid p={5} >
            <SectionLeft
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              title="Our Mission"
              image="our_mission.png"
            />
          </Grid>
          <Grid p={5} >
            <Section
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              title="Our Future"
              image="our_future.png"
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

const Section = (props) => {
  return (
    <Card className="rounded-pill" sx={{ bgcolor: "#1E3B5B", display: "flex" }}>
      <CardContent m={5}>
        <Typography color="#FFFFFF" p={2} variant="h3" align="center">
          {props.title}
        </Typography>
        <Typography p={5} color="#C5D5EA" align="center" variant="body1">
          {props.description}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        sx={{ height: "auto", width: 300 }}
        alt="image"
        className="rounded-pill"
        image={props.image}
      ></CardMedia>
    </Card>
  );
};
const SectionLeft = (props) => {
  return (
    <Card className="rounded-pill" sx={{ bgcolor: "#C5D5EA", display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ height: "auto", width: 300 }}
        alt="image"
        className="rounded-pill"
        image={props.image}
      ></CardMedia>
      <CardContent m={5}>
        <Typography color="#FFFFFF" p={2} variant="h3" align="center">
          {props.title}
        </Typography>
        <Typography color="#1E3B5B" p={2} align="center" variant="body1">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default About;
