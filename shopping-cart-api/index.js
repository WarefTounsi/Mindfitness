import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cartRouter from './routes/cart.js';
import paymentRouter from './routes/payment.js';

dotenv.config();

const app = express();

//body Parsers
app.use(bodyParser.json());

// cartRouter(app)
// paymentRouter(app)

app.get('/health', (req,res) => {
    res.status(200).send("Your cart-shopping API works successfully!");
})

app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT)
})

