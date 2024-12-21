import axios from "axios";

const API = ({ headers = {}, params = {} } = {}) => {
  const instance = axios.create({
    baseURL: "https://api.npoint.io/6835d802cd35763cdab7",
    headers: {
      "Content-type": "application/json",
      ...headers,
    },
    params,
  });

  return instance;
};

export { API };
