const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

//connect database
mongoose
     .connect(process.env.DB_CONNECTION_URI)
     .then(() => console.log("Connected to mongoDB"))
     .catch((e) => {
          console.log("error connecting to mongoDB");
          console.log(e);
     });

//let's definite our api object
const app = express();

//bodyParser
const urlencodedParser = bodyParser.urlencoded({
     extended: true,
     limit: "50mb",
});
app.use(urlencodedParser);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static("storage"));

//Définition des CORS
app.use(function (req, res, next) {
     res.setHeader(
          "Access-Control-Allow-Headers",
          "X-Requested-With,Content-Type,Content-Range"
     );
     res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, OPTIONS, PUT, PATCH, DELETE"
     );
     res.setHeader("Access-Control-Allow-Credentials", true);
     next();
});

//router Definition
const router = express.Router();

//Importing route
const coachRoutes = require("./routes/coachRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const contactRoutes = require("./routes/contactRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const reservationsRoutes = require("./routes/ReservationRoutes");
const userRoutes = require("./routes/userRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const payment = require("./routes/payment");

//Register Route
coachRoutes(app);
trainingRoutes(app);
contactRoutes(app);
partnerRoutes(app);
reservationsRoutes(app);
purchaseRoutes(app);
userRoutes(app);
payment(app);

app.listen(process.env.API_PORT, () => {
     console.log(`Listening on port ${process.env.API_PORT}`);
});

app.use(
     "/health",
     require("express-healthcheck")({
          healthy: function () {
               return { message: "ExpressJS web service is up and running" };
          },
     })
);

app.use("/api", router);
