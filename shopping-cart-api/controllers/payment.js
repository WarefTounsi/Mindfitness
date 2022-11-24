import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

export const makePayment = function(req,res){
    const url = "https://developers.flouci.com/api/generate_payment"
        const payload = {
            app_token: "a5820074-7dae-4e44-8cd7-70d46312bb64",
            app_secret: process.env.FLOUCI_SECRET,
            amount: req.query.amount,
            accept_card: "true",
            session_timeout_secs: "50",
            success_link: process.env.SUCCESS_LINK,
            fail_link: process.env.FAILED_LINK,
            developer_tracking_id: "ef560fb0-d202-4a56-a115-cfb4d52dd7f3"
      }
      axios.post(url,payload).then((response) => res.json(response.data)).catch((err) => res.json(err))
}

export const verifyPayment = async function (req,res) {
    const payment_id = req.params.id
    const url = "https://developers.flouci.com/api/verify_payment/" + payment_id
    const response = await axios.get(url,{'apppublic': 'a5820074-7dae-4e44-8cd7-70d46312bb64','appsecret':process.env.FLOUCI_SECRET})
    const data = await response.data;
    return data;
}