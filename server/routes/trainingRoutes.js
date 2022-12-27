const trainingHandler = require("../controllers/trainingController");
const { FileHandler } = require("../utils/FileHandler");
const multer = require("multer");
const upload = multer({ dest: "storage/" });

module.exports = function (app) {
     app.route("/training/:id")
          .get(trainingHandler.getTrainingById)
          .put(trainingHandler.editTrainingById)
          .delete(trainingHandler.deleteTraining);
     app.route("/training").post(
          upload.fields([
               { name: "image", maxCount: 1 },
               { name: "ressources", maxCount: 10 },
               { name: "video", maxCount: 1 },
          ]),
          FileHandler,
          trainingHandler.createTraining
     );
     app.route("/training").get(trainingHandler.getTrainings);
     app.route("/training/:id/is-mine").get(trainingHandler.isMine);
};
