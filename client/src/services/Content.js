import axios from 'axios';

export async function getPartnersList() {
    let response = await axios.get('/partner');
    let partnerList = await response.data;
    return partnerList;
} 