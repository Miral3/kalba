import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import { Input, Button, Icon } from "../../../../components";
import { ErrorText } from "../index";
import * as S from "../../Auth.style";

const Register = () => {
  const inputRef = useRef(null);
  const initialValues = {
    tag: "",
    name: "",
    password: "",
    passwordConfirm: "",
  };
  const login = async () => {};
  const {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    checkEmptyValue,
  } = useForm({
    initialValues,
    login,
    validate: ({ name, password, passwordConfirm }) => {
      const newErrors = {};
      const nameReg = /^[a-zA-Z0-9-_/-]{6,16}$/;
      const passwordReg = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
      if (name && !nameReg.test(name))
        newErrors.name =
          "6~16자의 영소/대문자, 숫자, 특수기호(_),(-)만 가능합니다.";
      if (password && !passwordReg.test(password))
        newErrors.password = "8~16자의 영소/대문자, 숫자 조합만 가능합니다.";
      if (passwordConfirm && password !== passwordConfirm)
        newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
      return newErrors;
    },
  });

  return (
    <S.Card>
      <S.Logo>
        <NavLink to="/">Kalba</NavLink>
      </S.Logo>
      <S.Form onSubmit={handleSubmit}>
        <S.Label>회원가입</S.Label>
        <S.InputWrapper isFilled={values.tag}>
          <Input
            ref={inputRef}
            version="auth"
            name="tag"
            onChange={handleChange}
          />
          <S.InputLabel>태그번호</S.InputLabel>
          <S.IconWrapper>
            <Icon>search</Icon>
          </S.IconWrapper>
        </S.InputWrapper>
        {errors.tag && <ErrorText value={errors.tag} />}
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
        <S.InputWrapper isFilled={values.passwordConfirm}>
          <Input
            version="auth"
            name="passwordConfirm"
            type="password"
            onChange={handleChange}
          />
          <S.InputLabel>비밀번호 확인</S.InputLabel>
        </S.InputWrapper>
        {errors.passwordConfirm && <ErrorText value={errors.passwordConfirm} />}
        <Button
          type="submit"
          version="login"
          disabled={
            checkEmptyValue() || isLoading || Object.keys(errors).length !== 0
          }
        >
          회원가입
        </Button>
        <S.Link>
          <NavLink to="/auth/login">로그인</NavLink>
        </S.Link>
      </S.Form>
    </S.Card>
  );
};

export default Register;
