import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";
import axios from "axios";

const dataProvider = simpleRestProvider(
  "http://localhost:8800",
  fetchUtils.fetchJson,
  "X-Total-Count"
);
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  return fetchUtils.fetchJson(url, options);
};
const myDataProvider = {
  ...dataProvider,
  create: (resource, params) => {
    switch (resource) {
      case "training":
        let formData = new FormData();
        let data = params.data;
        formData.append("title", data["title"]);
        formData.append("subTitle", data["subTitle"]);
        formData.append("category", data["category"]);
        formData.append("price", data["price"]);
        formData.append("description", data["description"]);
        formData.append("image", data["image"].rawFile);
        formData.append("video", data["video"].rawFile);
        data["tags"].forEach((tag) => {
          formData.append("tags", tag);
        });
        console.log(data);
        data["prerequisties"]?.forEach((element) => {
          console.log(element.item);
          formData.append("prerequisites", element.item);
        });
        data["addedValue"]?.forEach((element) => {
          formData.append("addedValue", element.item);
        });
        data["content"].forEach((content) => {
          formData.append("chaptersTitles", content.chapterTitle);
          formData.append("chaptersDescriptions", content.chapterDescription);
          formData.append("ressources", content.file.rawFile);
        });
        return httpClient("http://127.0.0.1:8800/training", {
          method: "POST",
          body: formData,
        }).then(({ json }) => ({
          data: { ...params.data, id: json.id },
        }));
        break;
      case "partner":
        const newPartnerImage = params.data.picture;
        return convertFileToBase64(newPartnerImage).then((picture64) => (picture64)).then((transformedNewPicture) => (
            axios.post("http://localhost:8800/partner",{
              partnerName: params.data.partnerName,
              picture: transformedNewPicture
            })  
        )).then((response) => {
          return response
        });
      case "coach":
        const newPicture = params.data.picture;
        return convertFileToBase64(newPicture)
          .then((picture64) => (
                picture64 ))
          .then((transformedNewPicture) => (
            axios.post("http://localhost:8800/coach",{
              ...params.data,
              picture: {
                src : transformedNewPicture,
                title: newPicture.title
              }
            })) 
          ).then((response) => {
            return  response 
          });
          break;
      default:
        return dataProvider.create(resource, params);
    }
  } 
};

/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file.rawFile);
  });
};

export default myDataProvider;
