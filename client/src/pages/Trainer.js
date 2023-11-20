import Container from "@mui/material/Container";
import TrainerCard from "../components/TrainerCard";
import { Grid, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { getCoachList } from "../services/Trainer";
import BestTrainer from "../components/BestTrainer";
import HeroSection from "./HeroSection";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

export default function Trainer() {
  const [coachList, setCoachList] = useState([]);
  useEffect(() => {
    let mounted = true;
    getCoachList().then((data) => {
      if (mounted) {
        setCoachList(data);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Grid container xs={12} py={5}>
          <Box p={4}>
            <Typography align="center" variant="h3">
              <span className="border-bottom border-5 border-danger">
                Explore Our Coaches
              </span>
            </Typography>
          </Box>
        </Grid>
        <Grid container xs={12} py={5}>
          <HeroSection
            description="Discover a diverse group of experienced coaches dedicated to guiding you on your journey to physical and mental well-being. Our coaches bring a wealth of knowledge and passion to help you achieve your fitness goals. Get ready to embark on a transformative experience with our team of expert trainers."
            imagePath="trainer_logo.png"
          />
        </Grid>
        <Grid container className="text-center" mb={5}>
          <Grid
            xs={9}
            px={3}
            container
            rowSpacing={1}
            direction="row"
            columnSpacing={{ xs: 5, sm: 2, md: 3 }}
          >
            {coachList.length === 0 ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress color="primary" size={100} />
              </Box>
            ) : (
              coachList.map((item) => {
                return (
                  <Grid item className="px-2" xs={4} key={item.id}>
                    <TrainerCard
                      firstName={item.firstName}
                      lastName={item.lastName}
                      description={item.description}
                      picture={item.picture}
                      coachId={item.id}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
          <Grid xs={3}>
            <BestTrainer />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
