import axios from "axios";

let baseUrl = 'https://minter-scoring.space/api/';

export const HTTP = axios.create({
  baseURL: baseUrl
});
