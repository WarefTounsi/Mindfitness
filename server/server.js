const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const axios = require("axios");
let multer = require("multer");
const upload = multer({ dest: "storage/" });

//connect database
mongoose
     .connect(process.env.DB_CONNECTION_URI)
     .then(() => console.log("Connected to mongoDB"))
     .catch((e) => {
          console.log("error connecting to mongoDB");
          console.log(e);
     });
console.log(process.env.DB_CONNECTION);

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

app.post(
     "/training",
     upload.fields([
          { name: "image", maxCount: 1 },
          { name: "ressources", maxCount: 10 },
          { name: "video", maxCount: 1 },
     ]),
     function (req, res, next) {
          console.log(req.body);
          console.log(req.files);
          req.body.image =
               "http://localhost:8800/" + req.files.image[0].filename;
          req.body.content = [];
          for (let i = 0; i < req.body.chaptersTitles.length; i++) {
               console.log({
                    chapterTitle: req.body.chaptersTitles[i],
                    chapterDescription: req.body.chaptersDescriptions[i],
                    file: req.files.ressources[i].path,
               });
               req.body.content.push({
                    chapterTitle: req.body.chaptersTitles[i],
                    chapterDescription: req.body.chaptersDescriptions[i],
                    file: req.files.ressources[i].path,
               });
          }
          console.log(req.body);
          next();
     }
);

//Register Route
coachRoutes(app);
trainingRoutes(app);
contactRoutes(app);
partnerRoutes(app);
reservationsRoutes(app);
purchaseRoutes(app);
userRoutes(app);

app.post("/payment",async function (req, res) {
  console.log('Works')
     const request = await axios.post(
          "https://developers.flouci.com/api/generate_payment",
          {
               "app_token": "a5820074-7dae-4e44-8cd7-70d46312bb64",
               "app_secret": "a5820074-7dae-4e44-8cd7-70d46312bb64",
               "amount": "350",
               "accept_card": "true",
               "session_timeout_secs": "50",
               "success_link": "www.google.com",
               "fail_link": "www.google.com",
               "developer_tracking_id": "",
          },
          {
               headers: { "content-type": "application/json" },
          }
     ).catch(err => {console.log(err);});
     res.status(200).send('SUccess')
});

const port = 8800;
app.listen(port, () => {
     console.log(process.env);
     console.log(`Listening on port ${port}`);
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
