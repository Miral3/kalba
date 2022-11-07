import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import useLocalStorage from "../useLocalstorage";
import * as url from "../../constants/apiUrl";

export const useLogin = ({ options }) => {
  const navigate = useNavigate();
  const [, setToken] = useLocalStorage("token", null);
  return useMutation((info) => axios.post(`${url.LOGIN}`, info), {
    onSuccess({ data }) {
      navigate(`/`);
      setToken(data.token);
    },
    onError(err) {
      alert("계정 정보가 올바르지 않습니다. 다시 한번 확인해주세요.");
      console.log(err);
    },
    ...options,
  });
};

export const useSignup = ({ options }) => {
  const navigate = useNavigate();
  return useMutation((info) => axios.post(`${url.REGISTER}`, info), {
    onSuccess() {
      alert("회원가입이 완료되었습니다. 로그인을 진행해주세요.");
      navigate(`/auth/login`);
    },
    onError(err) {
      const errMsg = err.response.data.resultMsg;
      alert(errMsg);
    },
    ...options,
  });
};

export const useVerifyToken = ({ options }) => {
  return useMutation((info) => axios.post(`${url.VERIFY}`, info), {
    onSuccess() {},
    onError(err) {
      console.log(err);
    },
    ...options,
  });
};
