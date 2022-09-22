import React from "react";
import { NavLink } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import { Input, Button } from "../../../../components";
import { ErrorText } from "../index";
import * as S from "../../Auth.style";

const Login = () => {
  const initialValues = {
    name: "",
    password: "",
  };
  const onSubmit = async () => {};
  const {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    checkEmptyValue,
  } = useForm({
    initialValues,
    onSubmit,
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
        <S.InputWrapper isFilled={values.name}>
          <Input version="auth" name="name" onChange={handleChange} />
          <S.InputLabel>아이디</S.InputLabel>
        </S.InputWrapper>
        {errors.name && <ErrorText value={errors.name} />}
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
          <NavLink to="/auth/register">회원가입</NavLink>
        </S.Link>
      </S.Form>
    </S.Card>
  );
};

export default Login;
