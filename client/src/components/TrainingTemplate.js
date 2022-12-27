import ReactPlayer from "react-player";
import Footer from "./Footer";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  Snackbar,
  Alert,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Chip, CardMedia, Container, Divider, Rating } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import GradingIcon from "@mui/icons-material/Grading";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import NavBar from "./Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTrainingById } from "../services/Training";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { addPurchase } from "../services/Purchase";
import useAuth from "../hooks/useAuth";
import { isMine } from "../services/Training";

function  getContentOfCourse (id,owner){
  return isMine(id,owner);
}



const TrainingTemplate = () => {

  const trainingId = useParams();
  const [training, setTraining] = useState({});
  const [play, setPlay] = useState(false);
  const [open, setOpen] = useState(false);
  const [trainingContent, setTrainingContent] = useState([]);
  const [msg, setMsg] = useState("");
  const auth = useAuth();

  useEffect(() => {
      if(sessionStorage.getItem("auth")){
        getContentOfCourse(trainingId.id,JSON.parse(sessionStorage.getItem("auth")).user).then((data) => setTrainingContent(data)).catch((err) => {console.log(err)})
      }
  },[]);

  useEffect(() => {
    getTrainingById(trainingId.id).then((training) => {
      setTraining(training);
    });
  }, []);

  const handleModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    const username = JSON.parse(sessionStorage.getItem("auth")).user;
    console.log(training.addedValue);
    addPurchase({
      trainingId: trainingId.id,
      username,
      name: training.title,
      price: training.price,
      advantages: training.addedValue,
      image: training.image,
    })
      .then((data) => setMsg(data.message))
      .catch((error) => console.log(error));
    setOpen(false);
  };

  return (
    <>
      <NavBar />
      <Box
        p={5}
        sx={{
          width: "100%",
          height: "50vh",
          backgroundImage:
            "linear-gradient(to right top, #016fb9, #1362a0, #1a5489, #1e4771, #1e3b5b);",
          backgroundRepeat: "no-repeat",
          color: "#FFF",
        }}
      >
        <Container mx={5} sx={{ display: "flex", flexDirection: "column" }}>
          <Grid container justifyContent="space-between" direction="row">
            <Grid xs={8}>
              <Typography color="primary" py={3} variant="h2">
                {training.title}
              </Typography>
              <Typography color="primary" py={2} variant="h5">
                {training.subTitle}
              </Typography>
              <Typography mb={3}>{training.description}</Typography>
              <Rating name="read-only" value={training.note} readOnly />
            </Grid>
            <Grid xs={4} pl={5} pt={5}>
              <ReactPlayer
                width={360}
                height={260}
                onReady={() => setPlay(true)}
                playing={play}
                controls={true}
                url={training?.image}
              ></ReactPlayer>
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between" direction="row">
            <Grid container item xs={8} justifyContent="flex-start" alignItems="center">
              {training?.tags?.map((tag) => (
                <Grid item px={2} >
                  <Chip
                    size="medium"
                    color="warning"
                    label={tag}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={4}>
              <Box
                sx={{
                  marginTop: 3,
                  justifyContent: "space-evenly",
                  display: "flex",
                }}
              >
                <Button
                  onClick={handleModal}
                  variant="contained"
                  color="warning"
                >
                  <AddShoppingCartIcon />
                  Ajouter au panier
                </Button>
                <Box display="flex">
                  <Typography variant="h4" color="success">
                    {training.price}
                  </Typography>
                  <Typography variant="body2">DT</Typography>
                </Box>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Do you really want to add this course to your cart?
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      xs={{ display: "flex", justifyContent: "center" }}
                      id="alert-dialog-description"
                    >
                      Vous devez Passer à votre espace achats pour continuer le
                      processus de paiement
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleConfirm}>Confirmer</Button>
                    <Button onClick={handleClose} autoFocus>
                      Annuler
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container>
        <Grid mb={4} mt={4} container>
          <Grid item xs={8}>
            <Typography variant="h4" color="primary">
              <span className="border-bottom border-3 border-warning">
                Content
              </span>
            </Typography>
            <Grid xs={12} mr={5} py={5}>
              {training?.content?.map((element) => (
                <Accordion key={element.chapterTitle}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="fst-italic">
                      <AutoStoriesIcon />
                      &nbsp; &nbsp;
                      {element.chapterTitle}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{element.chapterDescription}</Typography>
                    <ReactPlayer playing={true} controls={true} url={`http://localhost:8800/${trainingContent[element.chapterTitle]}` }/>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid
              xs={12}
              className="border mb-5 shadow rounded-3 border-2 border-primary"
            >
              <Typography variant="h5" color="primary" m={2}>
                Prerequisties
              </Typography>
              <List>
                {training?.prerequisites?.map((element) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <GradingIcon color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText>{element}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid
              xs={12}
              className="border shadow rounded-3 border-2 border-primary"
            >
              <Typography variant="h5" color="primary" m={2}>
                Added Values
              </Typography>
              <List>
                {training?.addedValue?.map((element) => (
                  <ListItem key={element}>
                    <ListItemAvatar>
                      <Avatar>
                        <PostAddIcon color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText>{element}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={msg !== ""} autoHideDuration={5}>
        <Alert severity={msg == "Already Added" ? "warning" : "success"}>
          {msg}
        </Alert>
      </Snackbar>
      <Footer />
    </>
  );
};

export default TrainingTemplate;
