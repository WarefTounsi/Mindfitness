import axios from "axios";

export  async function getCoachList() {
    // Specify the role id for the coach 
    //You should get the list of users with the specificed coach id 
    let reponse = await axios.get('/user?role=2')
    let coachList = await reponse.data;
    return coachList;    
}

export async function getCoachById(id) {
    let response = await axios.get('/coach/' + id);
    let coach = await response.data;
    return  coach;
}
export async function getCoachByEmail(coachEmail) {
    let response = await axios.get('/coach',{params: {email: coachEmail}});  
    let coach = await response.data
    return coach;
}

export async function editCoach(coachId, data){
    let response = await axios.put('/coach/' + coachId,{   
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        hourPrice: data.hourPrice,
        phoneNumber: data.phoneNumber,
        socialMediaAccounts: data.socialMediaAccounts,
        skills: data.skills,
        expertiseFields: data.expertiseFields
    })

    return response;
}
