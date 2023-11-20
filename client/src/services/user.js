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

export async function getUserById(id) {
    let response = await axios.get(`/user/ ${id}`);
    let coach = await response.data;
    return  coach;
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