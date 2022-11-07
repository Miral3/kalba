import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import useSearch from "../../../../hooks/useSearch";
import { Input, Button, AutoComplete, ErrorText } from "../../../../components";
import { Reference } from "../index";
import * as S from "../../Auth.style";
import Verification from "../Verification/Verification";

const Signup = () => {
  const navigate = useNavigate();
  const [verificationVisible, setVerificationVisible] = useState(false);
  const [referenceVisible, setReferenceVisible] = useState(false);
  const [verificationData, setVerificationData] = useState({});
  const [isVerification, setIsVerification] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const filterOption = ["name", "tag"];

  const getInnerText = (node, idx) => {
    return node.children[idx].children[1].innerText.substring(3);
  };

  const handleSubmitSearch = (searchedUser) => {
    inputRef.current.value = searchedUser.tag;
    setVerificationData({
      name: searchedUser.name,
      tag: searchedUser.tag,
    });
    setVerificationVisible(true);
  };

  const {
    data,
    isLoading: isAutoCompleteLoading,
    activeItem,
    autoCompleteVisible,
    containerRef,
    setAutoCompleteVisible,
    handleChangeInput,
    handleSearch,
    handleKeyDown,
    handleFocusInput,
  } = useSearch({
    inputRef,
    listRef,
    onSearch: handleSubmitSearch,
    filterOption,
    getInnerText,
  });

  const handleClickItem = (item) => {
    inputRef.current.value = item.tag;
    setAutoCompleteVisible(false);
    setVerificationData({ name: item.name, tag: item.tag });
    setVerificationVisible(true);
  };

  const initialValues = {
    tag: "",
    name: "",
    password: "",
    passwordConfirm: "",
  };

  const signup = async () => {
    alert("회원가입이 완료되었습니다. 로그인을 진행해주세요.");
    navigate(`/auth/login`);
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
    onSubmit: signup,
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
      {verificationVisible && (
        <Verification
          data={verificationData}
          modalVisible={verificationVisible}
          setModalVisible={setVerificationVisible}
          setReferenceVisible={setReferenceVisible}
          setIsVerification={setIsVerification}
        />
      )}
      {referenceVisible && (
        <Reference
          modalVisible={referenceVisible}
          setModalVisible={setReferenceVisible}
        />
      )}
      <S.Logo>
        <NavLink to="/">Kalba</NavLink>
      </S.Logo>
      <S.Form onSubmit={handleSubmit}>
        <S.Label>회원가입</S.Label>
        <S.InputWrapper ref={containerRef} isFilled={values.tag}>
          <Input
            ref={inputRef}
            version="auth"
            name="tag"
            autoComplete="off"
            disabled={isVerification}
            onChange={(e) => {
              handleChange(e);
              handleChangeInput(e);
            }}
            onKeyDown={(e) => handleKeyDown(e)}
            onFocus={handleFocusInput}
          />
          <S.InputLabel>태그번호</S.InputLabel>
          <S.StyledButton
            onClick={handleSearch}
            isVerification={isVerification}
          >
            <S.Search className="material-symbols-outlined">search</S.Search>
          </S.StyledButton>
          {data && (
            <AutoComplete
              ref={listRef}
              isLoading={isAutoCompleteLoading}
              data={data}
              active={activeItem}
              visible={autoCompleteVisible}
              onClick={handleClickItem}
            />
          )}
        </S.InputWrapper>
        {!values.tag && (
          <S.Description>닉네임 혹은 태그번호로 검색하세요.</S.Description>
        )}
        {values.tag && !isVerification && (
          <ErrorText value="인증되지 않았습니다. 검색을 통해 인증을 진행해주세요" />
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
            checkEmptyValue() ||
            isLoading ||
            Object.keys(errors).length !== 0 ||
            !isVerification
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

export default Signup;
