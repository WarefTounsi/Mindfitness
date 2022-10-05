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
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Purchase from "./Components/Purchase";
import { useState, useEffect } from "react";
import { getPurchase } from "../services/Purchase";
import useAuth from "../hooks/useAuth";
import { getTrainingById } from "../services/Training";

const Panier = () => {
  const [purchases, setPurchases] = useState([]);
  const authData = useAuth();

  useEffect(() => {
    console.log(authData.auth.user)
    getPurchase({owner: authData.auth.user}).then((purchases) => {console.log(purchases);return purchases.forEach((item) => getTrainingById(item.purchase))}).then((training) => console.log(training)).catch(err => console.log(err));
    setPurchases([1,2,3])
  },[])

  return (
    <Box>
      <Paper sx={{backgroundColor:'#745FEA', padding: 5 }}>
        <Typography variant="h3">Panier</Typography>
      </Paper>
      <Paper sx={{ marginTop: 3 }}>
        <Grid p={2} container>
          <Grid item xs={7}>
            {purchases.map(() => <Purchase />)}
          </Grid>
          <Grid item ml={10} xs={4}>
            <Card>
              <CardHeader xs={{ fontSize: 30 }} title="Total" />
              <Divider color="error" variant="middle" />
              <CardContent>
                <Box display="flex" justifyContent="space-evenly">
                  <Typography variant="h6">Sub Total</Typography>
                  <Typography variant="h6">362 DT</Typography>
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
                <Button fullWidth variant="contained">
                  Payer en un click
                </Button>
              </CardActionArea>
              <CardContent>
                <Typography variant="h6">Nous Acceptons :</Typography>
                <Box mt={2} display="flex" justifyContent="space-evenly">
                  <Chip color="warning" label="Master Card" />
                  <Chip color="warning" label="E-Dinar" />
                  <Chip color="warning" label="FLouci" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Panier;
