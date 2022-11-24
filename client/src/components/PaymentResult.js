import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DoneIcon from "@mui/icons-material/Done";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Link from "@mui/material/Link";

import { useState,useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {  verifyPayment } from "../services/Service";

const PaymentResult = ({ type }) => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    verifyPayment(searchParams.get("payment_id")).then((res) => {}).catch(() => {});
  },[])  
  const [textResult, setTextResult] = useState("");
  return (
    <Box>
      <Paper sx={{backgroundColor:'#A65199' ,textAlign: "center",margin:50, marginTop:30, paddingY:5 }} elevation={3}>
        <Typography variant="h3" color="#9FB2D8" align="center">
          {type
            ? "Your Payment has been successfully transmitted"
            : "Your payment has been Failed !"}
        </Typography>
        <Box sx={{fontSize:100, display: "flex", justifyContent:'center' }}>
          {type ? (
            <DoneIcon sx={{fontSize:80}} color="success" variant="large" />
          ) : (
            <SentimentVeryDissatisfiedIcon sx={{fontSize:80}} color='error' variant='large' />
          )}
        </Box>
        <Link href='home' underline="always" color='#CAD1E3' variant="h5">return to home page</Link>
      </Paper>
    </Box>
  );
};

export default PaymentResult;
