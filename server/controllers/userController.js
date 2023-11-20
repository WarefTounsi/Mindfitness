const account = require("./account/lib.js");
const User = require("../schema/schemaUser");

exports.getAllUsers = function (req, res) {
     res.setHeader("X-Total-Count", 5);
     const filters = req.query;
     User.find(filters, function (err, users) {
          if (err) {
               res.status(404).send(err);
          } else {
               res.status(200).json(users);
          }
     });
};

exports.updateUser = async function (req, res) {
     User.findOneAndUpdate(
          req.query,
          req.body,
          { new: false },
          function (err, user) {
               if (err) {
                    res.status(500).send("There is an error");
               } else {
                    res.status(200).send(user);
               }
          }
     );
};

exports.getUser = async function (req, res) {
     const userId = req.params.userId;

     User.findById(userId, { new: false }, function (err, user) {
          if (err) {
               res.status(500).send("There is an error");
          } else {
               res.status(200).send(user);
          }
     });
};

exports.deleteUser = function (req, res) {
     User.remove(
          {
               _id: req.params.id,
          },
          function (err, user) {
               if (err) {
                    res.status(404).json({
                         error: {
                              errors: [
                                   {
                                        domain: "global",
                                        reason: "notFound",
                                        message: "Not Found",
                                        description:
                                             "Couldn't find the requested userId '" +
                                             req.params.id +
                                             "'",
                                   },
                              ],
                              err,
                              code: 404,
                         },
                    });
               } else {
                    res.status(201).json({
                         message: "User successfully deleted",
                    });
               }
          }
     );
};
