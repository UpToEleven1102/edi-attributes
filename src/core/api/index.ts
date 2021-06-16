import axios from "axios";

// http://localhost:39755/ediattribute/571373/11
const axiosClient = axios.create({
  baseURL:
    document.currentScript?.getAttribute("baseUrl") ||
    "http://localhost:39755/ediattribute/",
});

const getData = <T>(url: string) =>
  new Promise<T>((resolve, reject) => {
    axiosClient
      .get<T>(url)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error));
  });

const postData = <T>(url: string, data: Object = {}) =>
  new Promise<T>((resolve, reject) => {
    axiosClient
      .post<T>(url, data)
      .then((res) => resolve(res.data))
      .catch((error) => reject(error));
  });

const deleteData = (url: string, data: Object = {}) =>
  axiosClient.delete(url, data);

const putData = (url: string, data: Object = {}) => axiosClient.put(url, data);

export { axiosClient, getData, postData, deleteData, putData };
