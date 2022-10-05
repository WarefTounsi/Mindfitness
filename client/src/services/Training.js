import axios from "axios";

export async function getTrainingList() {
  const reponse = await axios.get("/training");
  const tariningList = await reponse.data;
  return tariningList;
}

export async function getTrainingById(id) {
  const response = await axios.get("/training/" + id);
  const training = await response.data;
  return training;
}

export async function getTrainingByCreator(creatorId) {
  const response = await axios.get("/training", {
    params: {
      creator: creatorId,
    },
  });
  const courses = await response.data;
  return courses;
}

export async function getBestTrainingList() {
  const response = await axios.get("/training", { params: {
    note: 5
  }});
}
export async function createTraining(data) {
  const response = await axios(
    {
      method: 'POST',
      url: '/training',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  )
  return response;
}