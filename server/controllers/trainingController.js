const mongoose = require("mongoose");
const Training = require("../schema/schemaTraining");
const User = require("../schema/schemaUser");
const Purchase = require("../schema/schemaPurchase");

//Get Training by id
exports.getTrainingById = function (req, res) {
     Training.findById(req.params.id, function (err, Training) {
          if (err) {
               console.log(err);
               res.status(404).json({
                    error: {
                         errors: [
                              {
                                   domain: "global",
                                   reason: "notFound",
                                   message: "Not Found",
                                   description:
                                        "Couldn't find the requested TrainingId '" +
                                        req.params.id +
                                        "'",
                              },
                         ],
                         err,
                         code: 404,
                    },
               });
          } else {
               res.json(Training);
          }
     });
};

// Get all Trainings

exports.getTrainings = function (req, res) {
     res.header("Content-Range", "trainings 0-20/20");
     res.header("Access-Control-Expose-Headers", "X-Total-Count");
     res.header("X-Total-Count", 10);
     Training.find(req.query, function (err, Trainings) {
          if (err) {
               res.status(500).send(err);
          } else {
               res.json(Trainings);
               console.log(Trainings);
          }
     });
};

// Create a new Training
exports.createTraining = function (req, res) {
     const newTraining = new Training(req.body);
     console.log(req.body);
     newTraining.save(function (err, Training) {
          if (err) {
               console.log(err);
               res.status(400).send(err);
          } else {
               res.status(201).json(Training);
          }
     });
};

// Edit Training by Id

exports.editTrainingById = function (req, res) {
     Training.findOneAndUpdate(
          {
               _id: req.params.id,
          },
          req.body,
          { new: true },
          function (err, Training) {
               if (err) {
                    res.status(400).send(err);
               } else {
                    res.json(Training);
               }
          }
     );
};

exports.deleteTraining = function (req, res) {
     Training.remove(
          {
               _id: req.params.id,
          },
          function (err, Training) {
               if (err) {
                    res.status(404).json({
                         error: {
                              errors: [
                                   {
                                        domain: "global",
                                        reason: "notFound",
                                        message: "Not Found",
                                        description:
                                             "Couldn't find the requested TrainingId '" +
                                             req.params.id +
                                             "'",
                                   },
                              ],
                              err,
                              code: 404,
                         },
                    });
               } else {
                    res.status(204).json({
                         message: "Training successfully deleted",
                    });
               }
          }
     );
};

exports.getTrainingByFilter = function (req, res) {
     console.log(req.params);
     Training.find({ creator: req.params.creator }, function (err, training) {
          if (err) {
               res.status(404).json({ error: "Il y a une erreur" });
          } else {
               res.status(200).json(training);
          }
     });
};

exports.isMine = function (req, res) {
     const trainingId = req.params.id;
     const filters = {
          owner: req.query.owner,
          purchase: req.params.id,
          status: "PAID",
     };
     Purchase.find(filters)
          .then((purchase) => {
               if (purchase.length > 0) {
                    getContentOfTraining(purchase[0].purchase)
                         .then((training) => {
                              let responseData = {};
                              training.content.forEach((element) => {
                                   responseData[element.chapterTitle] = (element.file).slice(7);
                              });
                              console.log(responseData)
                              res.status(200).json(responseData);

                         })
                         .catch((err) => console.log(err));
               } else {
                    res.status(200).json([]);
               }
          })
          .catch((err) => {
               console.log(err);
          });
};

const getContentOfTraining = async (id) => {
     const training = await Training.findById(id);
     return training;
};
