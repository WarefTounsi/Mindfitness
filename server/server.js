const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

//Importing routes
const coachRoutes = require("./routes/coachRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const contactRoutes = require("./routes/contactRoutes");
const partnerRoutes = require("./routes/partnerRoutes");
const reservationsRoutes = require("./routes/ReservationRoutes");
const userRoutes = require("./routes/userRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const payment = require("./routes/payment");

//Connect To Database
mongoose
     .connect(process.env.DB_CONNECTION_URI)
     .then(() => console.log("Connected to mongoDB"))
     .catch((e) => console.log("error connecting to mongoDB"));

//Define Our API Object
const app = express();

//Configure Our API
const urlencodedParser = bodyParser.urlencoded({
     extended: true,
     limit: "50mb",
});

app.use(urlencodedParser);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static("storage"));

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

//Routers Definition
coachRoutes(app);
trainingRoutes(app);
contactRoutes(app);
partnerRoutes(app);
reservationsRoutes(app);
purchaseRoutes(app);
userRoutes(app);
payment(app);

//Start Our API
app.listen(process.env.API_PORT, () => {
     console.log(`Listening on port ${process.env.API_PORT}`);
});

//Check Our API
app.use(
     "/health",
     require("express-healthcheck")({
          healthy: function () {
               return { message: "ExpressJS web service is up and running" };
          },
     })
);

