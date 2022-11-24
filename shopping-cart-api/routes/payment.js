import { makePayment, verifyPayment } from "../controllers/payment.js";

const paymentRouter = (app) => {
    app.route('/payment').get(makePayment)
    app.route('/payment/:id').get(verifyPayment)
}

export default paymentRouter