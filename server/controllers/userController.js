const account = require("./account/lib.js");
const User = require("../schema/schemaUser");

exports.getAllUsers = function (req, res) {
     res.setHeader("X-Total-Count", 5);
     const filters = req.params;
     User.find(filters, function (err, users) {
          if (err) {
               res.status(404).send(err);
          } else {
               res.status(200).json(users);
          }
     });
};

exports.updateUser = async function (req, res) {
     User.findOneAndUpdate({ id: req.params }, function (err, user) {
          if (err) {
               console.log(user);
          } else {
               console.log(user);
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
