import axios from 'axios';

export async function createReservation(data) {
    let response = await axios.post('/reservation',data);
    return response.data;
}

export async function getReservationList(trainerId) {
    const response = await axios.get('/reservation');
    const data = await response.data;
    return data;
}
export async function getReservationListByTrainerId(id) {
    const response = await axios.get('/reservation',{params: {trainerId: id}});
    const data = await response.data;
    return data;
}

export async function getUserReservations(filters) {
    const response = await axios.get('/reservation',{params:filters});
    const data = await response.data;
    return data;
}

export async function getReservationListByTrainerIdAndStatus(id, status) {
    const response = await axios.get('/reservation',{params: {trainerId: id, status: status}});
    const data = await response.data;
    return data;
}
export async function changeStatus(id, _status){
    const response = await axios.put(`/reservation/${id}`,{
        status: _status
    });
    const data = await response.data;
    return data;
}