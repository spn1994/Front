//configuraçoes axios
//antes era local host
import axios from "axios";

export const api = axios.create({
  baseURL: "https://rocketnotes-api-n2tl.onrender.com"
});

