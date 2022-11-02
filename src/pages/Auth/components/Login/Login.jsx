/* eslint-disable no-use-before-define */
import React from "react";
import { NavLink } from "react-router-dom";
import { useLogin } from "../../../../hooks/queries/useAuth";
import useForm from "../../../../hooks/useForm";
import { Input, Button, ErrorText } from "../../../../components";
import * as S from "../../Auth.style";

const Login = () => {
  const { mutate } = useLogin({});
  const initialValues = {
    accountName: "",
    password: "",
  };
  const login = async () => {
    mutate({ ...values });
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
        <Button
          type="submit"
          version="login"
          disabled={checkEmptyValue() || isLoading}
        >
          로그인
        </Button>
        <S.Link>
          <NavLink to="/auth/signup">회원가입</NavLink>
        </S.Link>
      </S.Form>
    </S.Card>
  );
};

export default Login;
