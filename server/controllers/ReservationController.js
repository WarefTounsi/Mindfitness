const Reservation = require("../schema/schemaReservation");
const Coach = require("../schema/schemaCoach");
const { sendMail } = require("../external/mailer");
const { TemplateReservation } = require("../external/template");

exports.addReservation = function (req, res) {
     const reservation = new Reservation(req.body);
     reservation
          .save()
          .then((reservation) => {
               res.status(200).json(reservation);
               return Coach.findById(reservation.trainerId);
          })
          .then((trainer) => {
               const messageTest = sendMail({
                    receiver: trainer.email,
                    subject: "coaching reservation",
                    content: TemplateReservation(),
               });
          }).catch((error) => {res.status(200).send(error.message)});
};

exports.getReservation = function (req, res) {
     res.header("Content-Range", "reservations 0-20/20");
     res.header("Access-Control-Expose-Headers", "X-Total-Count");
     res.header("X-Total-Count", 10);
     console.log(req.query);
     Reservation.find(req.query, function (err, reservations) {
          if (err) {
               return res.status(500).send(err);
          } else {
               return res.status(200).json(reservations);
          }
     });
};

exports.editReservation = function (req, res) {
     Reservation.findOneAndUpdate(
          {
               _id: req.params.id,
          },
          req.body,
          { new: true },
          function (err, reservation) {
               if (err) {
                    return res.status(500).send(err);
               } else {
                    res.status(200).json(reservation);
               }
          }
     );
};
