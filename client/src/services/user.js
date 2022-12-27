import axios from "axios";

export async function updateUser(email, details) {
    const response = await axios.put(`/user`,details, {
        params: {
            email
        }
    });
    const data = await response.data;
    return data;
} 

export async function getUserByEmail(email) {
    const response = await axios.get('/user',{
        params : {
            email
        }
    });
    const data = await response.data;
    return data;
}