import React, { useRef } from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "./Shared/Header";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {
  changeStatus,
  getReservationListByTrainerId,
} from "../services/Reservation";
import { getCoachByEmail } from "../services/Trainer";
import useAuth from "../hooks/useAuth";
import Button from "@mui/material/Button";

export default function Reservations() {
  return (
    <Box>
      <Header title="Reservations" />
      <Box m={5}>
        <ReservationsTable />
      </Box>
    </Box>
  );
}
const ReservationsTable = () => {
  const colors = {
    pending: "warning",
    accepted: "success",
    rejected: "error"
  };
  const auth = useAuth();
  const [reservationList, setReservationList] = useState([]);
  const buttonElement = useRef();

  useEffect(() => {
    getCoachByEmail(auth?.auth?.user)
      .then((data) => getReservationListByTrainerId(data[0]?.id))
      .then((data) => {
        setReservationList(data);
      });
  }, []);

  const handleChangeStatusToAccepted = (e) => {
    changeStatus(e.target.id, "accepted");
  };
  const handleChangeStatusToRejected = (e) => {
    changeStatus(e.target.id, "rejected");
  };

  return (
    <Paper>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow></TableRow>
            <TableRow>
              <TableCell align="justify" className="p-2">
                <Typography variant="h5" className="p-2">
                  From
                </Typography>
              </TableCell>
              <TableCell align="justify" className="p-2">
                <Typography variant="h5" className="p-2">
                  Date
                </Typography>
              </TableCell>
              <TableCell align="justify" className="p-2">
                <Typography variant="h5" className="p-2">
                  Status
                </Typography>
              </TableCell>
              <TableCell align="justify" className="p-2">
                <Typography variant="h5" className="p-2">
                  Duration(H)
                </Typography>
              </TableCell>
              <TableCell align="justify" className="p-3">
                <Typography variant="h5" className="p-2">
                  Place
                </Typography>
              </TableCell>
              <TableCell align="justify" className="p-3">
                <Typography variant="h5" className="p-2">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservationList.map((item) => (
              <TableRow key={item.id}>
                <TableCell align="justify" className="p-3 fs-6">
                  {item.subject}
                </TableCell>
                <TableCell align="justify" className="p-3 fs-6">
                  {new Date(item.date).toLocaleDateString() + " - " + new Date(item.date).toLocaleTimeString() }
                </TableCell>
                <TableCell align="justify" className="p-3 fs-6">
                  <Chip label={item.status} color={colors[item.status]} />
                </TableCell>
                <TableCell align="justify" className="p-3 fs-6">
                  {item.duration}
                </TableCell>
                <TableCell align="justify" className="p-3 fs-6">
                  {item.place}{" "}
                </TableCell>
                <TableCell align="justify" className="p-3 fs-6">
                  <Grid direction="row" container>
                    {
                      item.status == 'accepted' || item.status == 'rejected' ? (<></>) : (<><Grid xs={6} p={2}>
                      <Button
                        variant="outlined"
                        ref={buttonElement}
                        id={item.id}
                        onClick={handleChangeStatusToAccepted}
                      >
                        Accept
                      </Button>
                    </Grid>
                    <Grid xs={6} p={2}>
                      <Button
                        variant="contained"
                        ref={buttonElement}
                        id={item.id}
                        color="error"
                        onClick={handleChangeStatusToRejected}
                      >
                        Refuse
                      </Button>
                    </Grid></>)
                    }
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination 
        rowsPerPageOptions={[5,10,25]}
        component='div'
      /> */}
    </Paper>
  );
};
