import axios from "axios";

export const Api = axios.create({
  // baseURL: 'https://fair-lime-shrimp-shoe.cyclic.app/',
  baseURL: 'http://localhost:3333/',
  timeout: 60000,
})