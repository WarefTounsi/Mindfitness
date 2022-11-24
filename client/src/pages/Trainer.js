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
        <Grid xs={12} py={5}>
          <Box p={4}>
            <Typography align="center" variant="h3">
              <span className="border-bottom border-5 border-danger">
                Explore Our Coachs
              </span>
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} py={5}>
          <HeroSection
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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
            {coachList.length == 0 ? (
              <Box sx={{display: 'flex', justifyContent: 'center'}} >
                <CircularProgress  color="primary" size={100} />
              </Box>
            ) : (
              coachList.map((item) => {
                return (
                  <Grid item className="px-2" xs={4}>
                    <TrainerCard
                      key={item.id}
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
            {coachList?.map((item) => {
              return (
                <Grid item className="px-2" xs={4}>
                  <TrainerCard
                    key={item.id}
                    firstName={item.firstName}
                    lastName={item.lastName}
                    description={item.description}
                    picture={item.picture}
                    coachId={item.id}
                  />
                </Grid>
              );
            })}
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
