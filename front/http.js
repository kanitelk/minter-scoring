import axios from "axios";

let baseUrl = 'http://localhost/api/';

export const HTTP = axios.create({
  baseURL: baseUrl
});
