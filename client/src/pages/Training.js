import React, { useEffect, useState } from "react";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Typography, Container } from "@mui/material";
import { getTrainingList, getBestTrainingList } from "../services/Training";
import Footer from "../components/Footer";
import "swiper/css";
import "swiper/css/pagination";
import FeaturedTraining from "./FeaturedTraining";
import SectionHeader from "./SectionHeader";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/system";
import HeroSection from "./HeroSection";
import NavBar from "../components/Navbar";
import TrainerCard from "../components/TrainerCard";

export default function Training() {
  const [training, setTraining] = useState([]);
  const [bestTrainings, setBestTrainings] = useState([]);
  useEffect(() => {
    getTrainingList().then((trainings) => setTraining(trainings));
    getBestTrainingList().then((trainings) => setBestTrainings(trainings));
  }, []);

  return (
    <>
      <NavBar />
      <Container m={1}>
        <Grid xs={12} py={5}>
          <Box p={5}>
            <Typography align="center" variant="h3">
              Explore Our Trainings
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} py={5}>
          <HeroSection
            description="Explore a world of wellness and personal growth with MindFitness. Our
            platform connects you with experienced coaches who are dedicated to
            helping you achieve your mental and physical well-being goals. "
            imagePath="training_logo.png"
            backgroundColor="#fff"
          />
        </Grid>

        <Grid xs={12}>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBeetween={50}
            slidesPerView={4}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2000,
            }}
          >
            {bestTrainings?.map((element) => (
              <SwiperSlide>
                <BestTraining
                  name={element.title}
                  description={element.subTitle}
                  rating={element.note}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid mt={5}>
          {training.map((element) => (
            <Grid py={5} className="text-start" xs={12}>
              <FeaturedTraining
                subTitle={element.subTitle}
                title={element.title}
                description={element.description}
                image={element.image}
                category={element.category}
                date={element.created_at}
                type="flex"
                tags={element.tags}
                id={element.id}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

const BestTraining = (props) => {
  return (
    <Grid item m={5} xs={12}>
      <Card sx={{ height: "50%", display: "block" }}>
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: 100,
          }}
          image="https://source.unsplash.com/random"
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography>{props.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Explore Now</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
