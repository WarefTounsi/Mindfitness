import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from "swiper";
import React, { useState } from "react";
import { createReservation } from "../services/Reservation";
import SchoolIcon from "@mui/icons-material/School";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import {
  Alert,
  Snackbar,
  Input,
  FormHelperText,
  CardActions,
  Rating,
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
} from "@mui/material";
import { useParams } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Swiper, SwiperSlide } from "swiper/react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useEffect } from "react";
import { getCoachById } from "../services/Trainer";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useAuth from "../hooks/useAuth";
import { getItem } from "../services/LocalStorage";
import { getTrainingByCreator } from "../services/Training";

export default function TrainerTemplate() {
  const location = useParams();
  const [coach, setCoach] = useState(null);
  const {auth,setAuth} = useAuth();
  let userId = location.id;
  useEffect(() => {
    getCoachById(userId).then((coach) => {
      setCoach(coach);
      setAuth(getItem('auth'));
      console.log(coach);
    });
    console.log(coach);
  }, []);
  return (
    <>
      <Box
        sx={{
          height: "50vh",
          display: "block",
          backgroundImage: "url(/default.jpeg)",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(to right top, #ede7e3, #d5d3c2, #acc3ac, #78b3aa, #489fb5)",
        }}
      >
        <Container disableGutters={true} className="rounded-1 ">
          <BioSection
            name={coach?.firstName + " " + coach?.lastName}
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
              <ReservationSection trainer={coach?.firstName + " " + coach?.lastName} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

function BioSection(props) {
  return (
    <Grid align="center">
      <Box>
        <Avatar
          sx={{
            position: "relative",
            top: -120,
            width: "10rem",
            height: "10rem",
          }}
          src={props?.picture}
        />
      </Box>
      <Paper elevation={10} sx={{ mt: -25, backgroundColor: "#82C0CC" }}>
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Paper elevation={10} sx={{ backgroundColor: "#82C0CC" }}>
          <Typography p={2} variant="h4">
            Contact Info
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <Box>
              <LocationOnIcon />
              {props?.email}
            </Box>
            <Box>
              <LocalPhoneIcon />
              {props?.phoneNumber}
            </Box>
          </Box>
          <Box
            sx={{
              marginBottom: 4,
              marginTop: 5,
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <FacebookIcon fontSize="large" color="primary" />
            <InstagramIcon fontSize="large" color="warning" />
            <LinkedInIcon fontSize="large" color="error" />
          </Box>
        </Paper>
        <Paper elevation={10} sx={{ backgroundColor: "#EDE7E3", marginTop: 5 }}>
          <Typography p={2} variant="h4">
            Tarif
          </Typography>
          <Box
            sx={{ marginBottom: 5, display: "flex", justifyContent: "center" }}
          >
            <Typography variant="h5">{props?.hourPrice + " "} $</Typography>
            <Typography variant="body2"> Hour</Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
function CurriclumSection({ skills }) {
  return (
    <>
      <Paper elevation={10} sx={{ backgroundColor: "#EDE7E3" }}>
        <Typography p={2} variant="h4">
          Skills
        </Typography>
        <Box p={5}>
          <Paper sx={{ backgroundColor: "#82C0CC" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "evenly",
                flexDirection: "column",
              }}
            >
              {skills?.map((skill) => (
                <Box sx={{ display: "flex" }}>
                  <Box p={2}>
                    <AddBoxIcon color="error" />
                  </Box>
                  <Typography p={2} variant="h5" className="fst-italic">
                    {skill}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Paper>
    </>
  );
}
function CoursesSection({coach}) {
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    getTrainingByCreator(coach).then((trainings) => {
      console.log(trainings);
    })   
  })
  const data = [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13];
  return (
    <Paper elevation={10} sx={{ paddingX: 5, backgroundColor: "#82C0CC" }}>
      <Box px={5} py={5} sx={{ display: "flex" }}>
        <ImportContactsIcon
          sx={{ fontSize: "40px", marginRight: 2 }}
          color="primary"
        />
        <Typography variant="h4" color="primary" className="fw-bold">
          Check my latest courses
        </Typography>
      </Box>
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        slidesPerView={4}
        spaceBetween={50}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 1000,
        }}
      >
        {data.map((item) => (
          <SwiperSlide>
            <BestTraining
              name={"course" + item}
              key={item}
              description={
                "Lorem Ipsum  dolor sit amet, consectetur adipiscing elit" +
                item
              }
              rating={item / 5}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Paper>
  );
}
function ReservationSection({trainer}) {
  const { auth,setAuth } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const currentDate = new Date().toISOString();
  const location = useParams();
  useEffect(() => {
    setAuth(sessionStorage.getItem('auth'))
    console.log(auth);
  },[])
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [duration, setDuration] = useState("");

  const handleClickOpen = () => {
    if (!auth) {
      setOpen(true);
    } else {
      setOpenSnackbar(true)
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    createReservation({
      subject,
      date,
      place,
      duration,
      trainerId: location.id,
      trainerName: trainer,
      owner: JSON.parse(sessionStorage.getItem('auth'))?.user
    }).then((reservation) => {console.log(reservation)})
    setOpen(false);
  };

  return (
    <>
      <MoveToInboxIcon
        fontSize="large"
        color="primary"
        sx={{ fontSize: "100px" }}
        viewBox="0 0 24 24"
      />
      <Box p={5}>
        <Button onClick={handleClickOpen} variant="contained" color="primary">
          Réserver votre première formation maintenant
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle align="center">Reserve</DialogTitle>
          <DialogContent>
            <DialogContentText m={2} align="center">
            </DialogContentText>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="subjectLabel">Subject</InputLabel>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required={true}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="placeInput">Place</InputLabel>
                  <Input
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    id="placeInput"
                    required={true}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="durationInput">Duration</InputLabel>
                  <Input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    id="durationInput"
                    required={true}
                  />
                  <FormHelperText>
                    The duration must be expressed in hours
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="dateInput"></InputLabel>
                  <Input
                    value={date}
                    type="datetime-local"
                    onChange={(e) => setDate(e.target.value)}
                    id="dateInput"
                    required={true}
                    min={currentDate}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Snackbar
        color="error"
        open={openSnackbar}
        autoHideDuration={6000}
        >
          <Alert severity="error">"You must Be logged in before" !</Alert>
        </Snackbar>
    </>
  );
}
const BestTraining = (props) => {
  return (
    <Box>
      <Paper>
        <Card sx={{ my: 6, height: "50%", display: "block" }}>
          <CardMedia
            component="img"
            sx={{
              // 16:9
              width: "100%",
              height: 100,
            }}
            image="https://source.unsplash.com/random"
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1, backgroundColor: "#EDE7E3" }}>
            <Typography gutterBottom variant="h5" component="h2">
              {props.name}
            </Typography>
            <Typography>{props.description}</Typography>
          </CardContent>
          <CardActions sx={{ backgroundColor: "#EDE7E3" }}>
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
