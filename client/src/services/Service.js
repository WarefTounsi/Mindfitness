import axios from 'axios';

export async function makePayment(amount,owner){
    const response = await axios.get('/payment',{params: {amount,owner}})
    const data = await response.data;
    return data
}

export const verifyPayment = async (payment_id) => {
    const response = await axios.get('/payment/' + payment_id);
}
