/* eslint-disable no-use-before-define */
import React from "react";
import { NavLink } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { adminState, loginProcess } from "../../../../recoil/authentication";
import { checkAdmin } from "../../../../api/account";
import { useLogin } from "../../../../hooks/queries/useAuth";
import useForm from "../../../../hooks/useForm";
import { Input, Button, ErrorText, Spinner } from "../../../../components";
import * as S from "../../Auth.style";

const Login = () => {
  const { mutateAsync } = useLogin({});
  const setIsAdmin = useSetRecoilState(adminState);
  const setLogin = useSetRecoilState(loginProcess);
  const initialValues = {
    accountName: "",
    password: "",
  };

  const login = async () => {
    try {
      const res = await mutateAsync({ ...values });
      const { token } = res.data;
      const isAdmin = await checkAdmin(token);
      setIsAdmin(isAdmin.data.admin);
      setLogin(token);
    } catch (err) {
      console.log(err);
    }
  };

  const {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    checkEmptyValue,
  } = useForm({
    initialValues,
    onSubmit: login,
    validate: () => {
      const newErrors = {};
      return newErrors;
    },
  });

  return (
    <S.Card>
      <S.Logo>
        <NavLink to="/">Kalba</NavLink>
      </S.Logo>
      <S.Form onSubmit={handleSubmit}>
        <S.Label>로그인</S.Label>
        <S.InputWrapper isFilled={values.accountName}>
          <Input version="auth" name="accountName" onChange={handleChange} />
          <S.InputLabel>아이디</S.InputLabel>
        </S.InputWrapper>
        {errors.accountName && <ErrorText value={errors.accountName} />}
        <S.InputWrapper isFilled={values.password}>
          <Input
            version="auth"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <S.InputLabel>비밀번호</S.InputLabel>
        </S.InputWrapper>
        {errors.password && <ErrorText value={errors.password} />}
        {isLoading ? (
          <Button version="loading">
            <Spinner.Base size="36px" />
          </Button>
        ) : (
          <Button
            type="submit"
            version="login"
            disabled={checkEmptyValue() || isLoading}
          >
            로그인
          </Button>
        )}
        <S.Link>
          <NavLink to="/auth/signup">회원가입</NavLink>
        </S.Link>
      </S.Form>
    </S.Card>
  );
};

export default Login;
