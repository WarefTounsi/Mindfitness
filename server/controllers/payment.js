const axios = require("axios");
const Purchase = require("../schema/schemaPurchase");
module.exports = {
     Add: async (req, res) => {
          const url = "https://developers.flouci.com/api/generate_payment";
          const payload = {
               app_token: process.env.FLOUCI_TOKEN,
               app_secret: process.env.FLOUCI_SECRET,
               amount: req.query.amount,
               accept_card: "true",
               session_timeout_secs: "50",
               success_link: process.env.SUCCESS_LINK,
               fail_link: process.env.FAILED_LINK,
               developer_tracking_id: process.env.DEVELOPER_TRACKING_ID,
          };
          axios.post(url, payload)
               .then((response) => {
                    Purchase.updateMany(
                         { owner: req.query.owner },
                         {
                              $set: {
                                   paymentId: response.data.result.payment_id,
                              },
                         }
                    )
                         .then((data) => {
                              res.json(response.data);
                         })
                         .catch((err) => console.log(err));
               })
               .catch((err) => {
                    res.json(err);
                    console.log(err);
               });
     },

     Verify: async (req, res) => {
          const id_payment = req.params.id;
          const url = "https://developers.flouci.com/api/verify_payment/" + id_payment;
          const headers = {
               "Content-Type": "application/json",
               "apppublic": process.env.FLOUCI_TOKEN,
               "appsecret": process.env.FLOUCI_SECRET,
          };
          axios.get(url, {
               headers
          }).then((response) => {
                    console.log(response.data);
                    if (response.data.result.status = "SUCCESS") {
                         Purchase.updateMany(
                              { paymentId: id_payment },
                              { $set: { status: "PAID" } }
                         ).then((info) => console.log(info)).catch((err) => console.log(err))
                    }
                    res.status(200).json({result: "true"})
               })
               .catch((err) => console.log(err));
     },
};
