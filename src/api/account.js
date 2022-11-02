import axios from "axios";
import * as url from "../constants/apiUrl";

export const checkAdmin = async (token) => {
  const res = await axios.get(`${url.ADMIN}?token=${token}`);
  return res;
};
