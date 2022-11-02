import axios from "axios";
import { useMutation } from "react-query";
import * as url from "../../constants/apiUrl";

export const useLogin = ({ options }) => {
  return useMutation((info) => axios.post(`${url.LOGIN}`, info), {
    onSuccess({ data }) {
      console.log(data.token);
    },
    onError(err) {
      console.log(err);
    },
    ...options,
  });
};
