import axios from "axios";

export async function addPurchase({trainingId, username,name,price,advantages,image}) {
    const response = await axios.post('/purchase',{
        purchase: trainingId,
        owner: username,
        image,
        price,
        name,
        image,
        advantages 
    });
    const data = await response.data;  
    return data       
}

export async function getPurchase(filters) {
    const response = await axios.get('/purchase',{params: filters});
    const data = await response.data;
    return data
}

export async function deletePurchase(id) {
    const response = await axios.delete('/purchase/' + id );
    const data = await response.data;
    return data
}

export async function getTotal(username) {
    const response = await axios.get('/purchase/total',{params: {username}});
    const data = await response.data;
    return data
}