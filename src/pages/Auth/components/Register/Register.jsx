import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import useSearch from "../../../../hooks/useSearch";
import { Input, Button, Icon, AutoComplete } from "../../../../components";
import { ErrorText } from "../index";
import { members } from "../../../../assets/dummyData";
import * as S from "../../Auth.style";

const Register = () => {
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const handleSearch = () => {};
  const filterOption = ["name", "tag"];
  const getInnerText = (node, idx) => {
    return node.children[idx].children[1].innerText.substring(3);
  };
  const {
    autoCompleteData,
    activeItem,
    autoCompleteVisible,
    handleSelect,
    handleFilter,
    handleKeyDown,
    resetAutoComplete,
  } = useSearch({
    searchRef,
    inputRef,
    listRef,
    data: members,
    onSubmit: handleSearch,
    filterOption,
    getInnerText,
  });

  const handleClickItem = (item) => {
    resetAutoComplete();
    inputRef.current.value = item.tag;
  };

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
        <S.InputWrapper ref={searchRef} isFilled={values.tag}>
          <Input
            ref={inputRef}
            version="auth"
            name="tag"
            autoComplete="off"
            onChange={(e) => {
              handleChange(e);
              handleFilter();
            }}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <S.InputLabel>태그번호</S.InputLabel>
          <S.IconWrapper>
            <Icon onClick={handleSelect}>search</Icon>
          </S.IconWrapper>
          <AutoComplete
            ref={listRef}
            data={autoCompleteData}
            active={activeItem}
            visible={autoCompleteVisible}
            onClick={handleClickItem}
          />
        </S.InputWrapper>
        {!values.tag && (
          <S.Description>닉네임 혹은 태그번호로 검색하세요.</S.Description>
        )}
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
