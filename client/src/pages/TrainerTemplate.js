import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper';
import React, { useState } from 'react';
import {
  createReservation,
  getReservationListByTrainerId,
} from '../services/Reservation';
import SchoolIcon from '@mui/icons-material/School';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  Alert,
  Snackbar,
  Input,
  FormHelperText,
  CardActions,
  Select,
  MenuItem,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Swiper, SwiperSlide } from 'swiper/react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useEffect } from 'react';
import { getUserById } from '../services/user';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useAuth from '../hooks/useAuth';
import { getItem } from '../services/LocalStorage';
import { getTrainingByCreator } from '../services/Training';
import Footer from '../components/Footer';

export default function TrainerTemplate() {
  const location = useParams();
  const [coach, setCoach] = useState(null);
  const { auth, setAuth } = useAuth();
  let userId = location.id;
  console.log(coach)
  useEffect(() => {
    getUserById(userId).then((coach) => {
      setCoach(coach);
      setAuth(getItem('auth'));
      console.log('coach', coach);
    });
  }, []);
  return (
    <>
      <Box
        sx={{
          height: '50vh',
          display: 'block',
          backgroundSize: '100%',
          backgroundColor: '#F8F4E8',
          backgroundRepeat: 'no-repeat',
        }}
      ></Box>
      <Box
        sx={{
          backgroundColor: '#F8F4E8',
        }}
      >
        <Container disableGutters={true} className="rounded-1 ">
          <BioSection
            name={coach?.firstName + ' ' + coach?.lastName}
            picture={coach?.picture?.src}
            bio={coach?.description}
          />
          <Grid mt={2} container spacing={10}>
            <Grid item xs={6}>
              <CurriclumSection skills={coach?.skills} />
            </Grid>
            <Grid item xs={6}>
              <ContactSection
                phoneNumber={coach?.phoneNumber}
                email={coach?.email}
                contacts={coach?.socialMediaAccounts}
                hourPrice={coach?.hourPrice}
              />
            </Grid>
            <Grid item xs={12}>
              <CoursesSection coach={userId} />
            </Grid>
            <Grid item align="center" xs={12}>
              <ReservationSection
                offers={coach?.expertiseFields}
                trainer={coach?.firstName + ' ' + coach?.lastName}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer></Footer>
    </>
  );
}

function BioSection(props) {
  return (
    <Grid align="center">
      <Box>
        <Avatar
          sx={{
            position: 'relative',
            top: -120,
            width: '10rem',
            height: '10rem',
          }}
          src={props?.picture}
        />
      </Box>
      <Paper elevation={5} sx={{ mt: -25, backgroundColor: '#FFFFF' }}>
        <Box display="block" height="5rem"></Box>
        <Typography pt={5} align="center" variant="h4">
          {props?.name}
        </Typography>
        <Typography align="center" p={5} variant="h6">
          {props?.bio}
        </Typography>
      </Paper>
    </Grid>
  );
}
function ContactSection(props) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      ></Box>
    </>
  );
}
function CurriclumSection({ skills }) {
  return <></>;
}
function CoursesSection({ coach }) {
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    getTrainingByCreator(coach).then((trainings) => {
      console.log("asdsaasd",trainings);
    });
  });
  const data = [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13];
  return <></>;
}
function ReservationSection({ trainer, offers }) {
  const { auth, setAuth } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dateAlreadyReserved, setDateAlreadyReserved] = useState([]);
  const currentDate = new Date().toISOString();
  const location = useParams();
  useEffect(() => {
    getReservationListByTrainerId(location.id).then((data) => {
      const table = data.map((item) => new Date(item.date));
      setDateAlreadyReserved(table);
    });
    setAuth(sessionStorage.getItem('auth'));
  }, []);
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [place, setPlace] = useState('');
  const [duration, setDuration] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const handleClickOpen = () => {
    if (!auth) {
      setOpen(true);
    } else {
      setOpenSnackbar(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDateChoice = (date) => {
    const d = new Date(date);
    if (dateAlreadyReserved.includes(d)) {
      setErrorMsg('Date already reserved !');
    } else {
      setErrorMsg('');
      setDate(date);
    }
  };
  const handleSubmit = () => {
    createReservation({
      subject,
      date,
      place,
      duration,
      trainerId: location.id,
      trainerName: trainer,
      owner: JSON.parse(sessionStorage.getItem('auth'))?.user,
    }).then((reservation) => {
      console.log(reservation);
    });
    setOpen(false);
  };

  return <></>;
}
const BestTraining = (props) => {
  return (
    <Box>
      <Paper>
        <Card sx={{ my: 6, height: '50%', display: 'block' }}>
          <CardMedia
            component="img"
            sx={{
              // 16:9
              width: '100%',
              height: 100,
            }}
            image="https://source.unsplash.com/random"
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1, backgroundColor: '#EDE7E3' }}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.name}
            </Typography>
            <Typography>{props.description}</Typography>
          </CardContent>
          <CardActions sx={{ backgroundColor: '#EDE7E3' }}>
            <Button size="small">Explore Now</Button>
          </CardActions>
        </Card>
      </Paper>
    </Box>
  );
};
// function Feedbacks() {
//   let table = [1, 2, 3, 4];
//   return (
//     <Grid container flexDirection="column" spacing={2}>
//       {table.map((item) => (
//         <Grid item key={item} xs={9}>
//           <Card>
//             <CardContent>
//               <Typography variant="h5">Flen Ben Foulen</Typography>
//               <Rating value={2.3} readOnly />
//               <Typography>
//                 Lorem Ipsum is simply dummy text of the printing and typesetting
//                 industry. Lorem Ipsum has been the industry's
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   );
// }
