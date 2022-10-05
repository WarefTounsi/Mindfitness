const Reservation = require("../schema/schemaReservation");
const { sendMail } = require("../external/mailer");

exports.addReservation = function (req, res) {
     let reservation = new Reservation(req.body);
     reservation.save(function (err, reservation) {
          if (err) {
               return res.status(500).send(err);
          } else {
               //send notification to coach by email

               // let messageTest = sendMail({
               //      sender: "client@mindfitness.tn",
               //      receiver: "coach@mindfitness.tn",
               //      subject: "coaching reservation",
               //      content: "<div>Information</div>",
               // });
               return res.status(200).json(reservation);
          }
     });
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
                    // let messageTest = sendMail({
                    //      sender: "client@mindfitness.tn",
                    //      receiver: "coach@mindfitness.tn",
                    //      subject: "coaching reservation",
                    //      content: "<div>Information</div>",
                    // });
               }
          }
     );
};
