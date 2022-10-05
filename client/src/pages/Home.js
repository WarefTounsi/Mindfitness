import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Card, CardContent, CardMedia, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { getPartnersList } from "../services/Content";
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from "swiper";
import ReactPlayer from "react-player";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

// Import Swiper styles

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HeroSection = () => {
  return (
    <Box color="#FFF" xs={{ height: "100vh" }} backgroundColor="#1E3B5B" p={5}>
      <Typography variant="h2" py={5} className="fw-bold">
        Welcome To MindFitness
      </Typography>
      <Typography variant="h5">
        MindFitness, C'est aussi que ça !
      </Typography>
      <div className="d-flex m-5 justify-content-center">
        <ReactPlayer
          playing={true}
          url="presentation.mp4"
          controls={true}
        ></ReactPlayer>
      </div>
      <Button variant="contained" href="/register" className="btn-warning mb-5">
        Get Started
      </Button>
    </Box>
  );
};

const AboutSection = () => {
  return (
    <Box color="#016FB9" backgroundColor="#C5D5EA" p={5}>
      <Typography variant="h3" className="py-4 fw-bold">
        Who We Are ?
      </Typography>
      <Box m={5}>
        <Typography color="#3E6680" variant="h5" className="pt-5 pb-5 fw-light">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's
          <br></br> standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it
          <br></br> to make a type specimen book. It has survived not only five
          centuries, but also the leap into electronic
          <br></br> typesetting, remaining essentially unchanged.
        </Typography>
      </Box>
      <Button variant="outlined" color="primary" href="/about">
        Read More About MindFitness
      </Button>
    </Box>
  );
};

const ServiceSection = () => {
  return (
    <Box color="#FFF" backgroundColor="#1E3B5B" p={5}>
      <Typography variant="h3" className="py-4 fw-bold">
        What We Offer ?
      </Typography>
      <Grid my={5} container justifyContent="space-evenly" direction="row">
        <Grid item xs={3}>
          <ServiceCard
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  Ipsum - Lorem Ipsum -  "
            title="Trainers"
            child={<GroupsIcon fontSize="large" />}
            more="Trainer"
          />
        </Grid>
        <Grid item xs={3}>
          <ServiceCard
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.   "
            title="Trainings"
            child={<SchoolIcon fontSize="large" />}
            more="Training"
          />
        </Grid>
        <Grid item xs={3}>
          <ServiceCard
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.   "
            title="Certifications"
            child={<WorkspacePremiumIcon fontSize="large" />}
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" href="/contact-us">
        Contact Us
      </Button>
    </Box>
  );
};

const PartnerSection = () => {
  const [partners, setPartners] = useState(null);

  useEffect(() => {
    getPartnersList().then((data) => {
      setPartners(data);
    });
  }, []);

  return (
    <>
      <Box color="#016FB9" p={5} backgroundColor="#C5D5EA">
        <Typography variant="h3" className="py-4 fw-bold">
          Who gives us confidence ?
        </Typography>
        <Box p={5}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            slidesPerView={4}
            autoplay={{
              delay: 1000,
            }}
            loop={true}
          >
            {partners?.map((partner) => (
              <SwiperSlide>
                <Box className="text-center">
                  <CardMedia
                    component="img"
                    src={partner.picture}
                    m={5}
                    sx={{ width: "150px", height: "150px" }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </>
  );
};

const Home = () => {
  // // const { setAuth } = useContext(AuthContext);
  // // const navigate = useNavigate();

  // // const logout = async () => {
  // // if used in more components, this should be in context
  // // axios to /logout endpoint
  // // setAuth({});
  // // navigate("/linkpage");
  // // };

  return (
    <>
      <NavBar />
      <div className="text-center">
        <HeroSection />
        <AboutSection />
        <ServiceSection />
        <PartnerSection />
        <Footer />
      </div>
    </>
  );
};

const ServiceCard = (props) => {
  return (
    <Box>
      <Card sx={{ backgroundColor: "#C5D5EA", display: "block" }}>
        <CardMedia>{props.child}</CardMedia>
        <CardContent>
          <Typography pb={2} variant="h4" className="fw-blod">
            {props.title}
          </Typography>
          <Typography variant="body1">{props.description}</Typography>
          <Grid mt={3}>
            <Button variant="outlined" href={"/" + props.more}>
              {" "}
              Explore Our {props.more}
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
