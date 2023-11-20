import React, { useState, useEffect } from "react";
import {
  Card,
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Chip,
  CardContent,
  CardActionArea,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Purchase from "./Components/Purchase";
import { deletePurchase, getPurchase, getTotal } from "../services/Purchase";
import useAuth from "../hooks/useAuth";
import { getTrainingById } from "../services/Training";
import axios from "axios";
import { makePayment } from "../services/Service";
import { getItem } from "../services/LocalStorage";

const Panier = () => {
  const [purchases, setPurchases] = useState([]);
  const [total, setTotal] = useState(0);
  const authData = useAuth();
  const [open, setOpen] = useState(false);

  const handleRemovePurchase = (id) => {
    deletePurchase(id)
      .then((success) => setOpen(true))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPurchase({ owner: authData.auth.user })
      .then((purchases) => setPurchases(purchases))
      .catch((err) => console.log(err));

    getTotal(authData.auth.user)
      .then((data) => setTotal(data.total))
      .catch((err) => console.log(err));
  }, [open]);

  const handlePayment = () => {
    makePayment(total, authData.auth.user)
      .then((data) => {
        window.location.href = data.result.link;
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ color: "#333" }}>
        Panier
      </Typography>
      <Paper sx={{ marginTop: 3, backgroundColor: "#f8f8f8" }}>
        <Grid p={2} container>
          <Grid item xs={7}>
            {purchases?.map((purchase) => (
              <Purchase
                removeMe={handleRemovePurchase}
                key={purchase?.id}
                id={purchase?.id}
                name={purchase?.name}
                image={purchase?.image}
                price={purchase?.price}
                advantages={purchase?.advantages}
              />
            ))}
          </Grid>
          <Grid item ml={10} xs={4}>
            <Card sx={{ border: "1px solid #ccc" }}>
              <CardHeader title="Total" sx={{ fontSize: 20, color: "#333" }} />
              <Divider color="error" variant="middle" />
              <CardContent>
                <Box display="flex" justifyContent="space-evenly">
                  <Typography variant="h6" sx={{ color: "#666" }}>
                    Sub Total
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#333" }}>
                    {total} DT
                  </Typography>
                </Box>
              </CardContent>
              <CardActionArea
                sx={{
                  paddingX: 4,
                  marginBottom: 2,
                  marginTop: 4,
                  display: "flex",
                }}
              >
                <Button
                  onClick={handlePayment}
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#0070c9", // Apple's typical blue color
                    color: "#fff",
                    borderRadius: "8px", // Rounded corners
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle box shadow
                    "&:hover": {
                      backgroundColor: "#005499", // Darker blue on hover
                    },
                  }}
                >
                  Payer en un click
                </Button>
              </CardActionArea>
              <CardContent>
                <Typography variant="h6" sx={{ color: "#666" }}>
                  Nous Acceptons :
                </Typography>
                <Box mt={2} display="flex" justifyContent="space-evenly">
                  <Chip
                    sx={{
                      backgroundColor: "#0070c9", // Apple's typical blue color
                      color: "#fff",
                      borderRadius: "8px", // Rounded corners
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle box shadow
                      "&:hover": {
                        backgroundColor: "#005499", // Darker blue on hover
                      },
                    }}
                    color="warning"
                    label="Master Card"
                  />
                  <Chip
                    sx={{
                      backgroundColor: "#0070c9", // Apple's typical blue color
                      color: "#fff",
                      borderRadius: "8px", // Rounded corners
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle box shadow
                      "&:hover": {
                        backgroundColor: "#005499", // Darker blue on hover
                      },
                    }}
                    color="warning"
                    label="E-Dinar"
                  />
                  <Chip
                    sx={{
                      backgroundColor: "#0070c9", // Apple's typical blue color
                      color: "#fff",
                      borderRadius: "8px", // Rounded corners
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle box shadow
                      "&:hover": {
                        backgroundColor: "#005499", // Darker blue on hover
                      },
                    }}
                    color="warning"
                    label="FLouci"
                  />
                </Box>
              </CardContent>
            </Card>
            <Snackbar open={open} autoHideDuration={6000}>
              <Alert severity="success" sx={{ width: "100%" }}>
                successfully deleted!
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Panier;
