import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Card, CardContent, CardMedia, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getPartnersList } from '../services/Content';
import { Navigation, Autoplay, Pagination } from 'swiper';
import ReactPlayer from 'react-player';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { io } from 'socket.io-client';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { newSocket } from '../socket/socket';

const HeroSection = () => {
  return (
    <Box color="#FFF" sx={{ height: '100vh' }} p={5}>
      <ReactPlayer
        playing={true}
        url="presentation.mp4"
        controls={true}
        width="100%" 
        height="100%"
      ></ReactPlayer>
      <div className="d-flex m-5 justify-content-center">
        <Button
          variant="contained"
          href="/register"
          sx={{ backgroundColor: '#0070c9', color: '#fff' }}
          className="mb-5"
        >
          Get Started
        </Button>
      </div>
    </Box>
  );
};

const AboutSection = () => {
  return (
    <Box color="#016FB9" p={5}>
      <Typography variant="h3" py={4} fontWeight="bold">
        Who We Are?
      </Typography>
      <Box m={5}>
        <Typography color="#3E6680" variant="h5" py={5} fontWeight="light">
          At MindFitness, we believe in the transformative power of coaching.
          Our mission is to connect you with expert coaches who will guide you
          on your journey towards mental and physical well-being. We understand
          that everyone's journey is unique, and our coaches are here to support
          you every step of the way.
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
    <Box color="#FFF" p={5}>
      <Typography variant="h3" py={4} fontWeight="bold">
        What We Offer?
      </Typography>
      <Grid my={5} container justifyContent="space-evenly" direction="row">
        <Grid item xs={3}>
          <ServiceCard
            description="Explore a variety of training programs designed to enhance your physical fitness. Our experienced trainers are here to customize a plan that suits your needs and helps you achieve your fitness goals."
            title="Personal Trainers"
            child={<GroupsIcon fontSize="large" />}
            more="Trainer"
          />
        </Grid>
        <Grid item xs={3}>
          <ServiceCard
            description="Embark on a learning journey with our specialized training programs. From academic courses to skill development, our trainers are committed to providing you with the knowledge you seek."
            title="Educational Programs"
            child={<SchoolIcon fontSize="large" />}
            more="Training"
          />
        </Grid>
        <Grid item xs={3}>
          <ServiceCard
            description="Earn certifications that validate your skills and expertise. Our certification programs cover a wide range of topics, empowering you to stand out in your field and achieve professional success."
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
    <Box color="#016FB9" p={5}>
      <Typography variant="h3" py={4} fontWeight="bold">
        Who Gives Us Confidence?
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
            <SwiperSlide key={partner.id}>
              <Box className="text-center">
                <CardMedia
                  component="img"
                  src={partner.picture}
                  m={5}
                  sx={{ width: '150px', height: '150px' }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

const Home = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <div className="text-center">
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
      <Card sx={{ backgroundColor: '#FFF', display: 'block' }}>
        <CardMedia>{props.child}</CardMedia>
        <CardContent>
          <Typography py={2} variant="h4" fontWeight="bold">
            {props.title}
          </Typography>
          <Typography variant="body1">{props.description}</Typography>
          <Grid mt={3}>
            <Button variant="outlined" href={'/' + props.more}>
              {' '}
              Explore Our {props.more}
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
