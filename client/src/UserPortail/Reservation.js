import Typography from "@mui/material/Typography";
import {
  Paper,
  Box,
  CardHeader,
  CardContent,
  ListItem,
  Grid,
  List,
  ListItemText,
  Chip,
  Link,
} from "@mui/material";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { getUserReservations } from "../services/Reservation";

export default function Reservation() {
  const [reservationList, setReservationList] = useState([]);
  useEffect(() => {
    let username = JSON.parse(sessionStorage.getItem("auth")).user;
    getUserReservations({ owner: username }).then((list) => {
      const reservationTable = list.map((reservation) => {
        let date = new Date(reservation.date);
        reservation.date =
          date.toDateString() + " - " + date.toLocaleTimeString();
        return reservation;
      });
      setReservationList(reservationTable);
    });
    console.log(reservationList);
  }, []);
  return (
    <Box>
      <Typography variant="h3" sx={{ color: "#354f52", marginBottom: 3 }}>
        My Reservations
      </Typography>
      <Paper>
        <Grid p={2} container spacing={2}>
          {reservationList?.map((reservation) => (
            <Grid key={reservation.id} item xs={4}>
              <Card elevation={7}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between">
                    <Chip
                      label={reservation.duration + " hours"}
                      color="primary"
                      variant="contained"
                    />

                    <Chip
                      label={reservation.status}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  <Box display="flex" justifyContent="center" mt={1}>
                    <Typography variant="h5">{reservation.subject}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="body1">{reservation.date}</Typography>
                    <Typography variant="body1">{reservation.place}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="center" mt={2}>
                    <Link
                      underline="hover"
                      href={"/trainer/" + reservation?.trainerId}
                    >
                      <Typography variant="h6">
                        {reservation?.trainerName}
                      </Typography>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
