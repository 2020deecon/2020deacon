import axios from "axios";
import { getToken } from "../token";

function getClient() {
  const api = axios.create({
    baseURL: "http://3.35.16.85:3000/",
    headers: {
      Content_type: "application/json",
      // "Authorization":getToken||''
    },
  });
  return api;
}

export default getClient;
