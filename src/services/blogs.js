import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (objectToUpdate) => {
  const config = {
    headers: { Authorization: token },
  };
  const objectId = objectToUpdate.id;
  const url = `${baseUrl}/${objectId}`;
  const response = await axios.put(url, objectToUpdate, config);
  return response.data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const blogService = {
  getAll: getAll,
  create: create,
  setToken: setToken,
  update: update,
};
export default blogService;
