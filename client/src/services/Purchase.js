import axios from "axios";

export async function addPurchase({trainingId, username}) {
    const response = await axios.post('/purchase',{
        purchase: trainingId,
        owner: username 
    });
    const data = await response.data;  
    return data       
}

export async function getPurchase(filters) {
    const response = await axios.get('/purchase',{params: filters});
    const data = await response.data;
    return data
}