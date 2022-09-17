import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Input, Button } from "../../../../components";
import * as S from "./Card.style";

const propTypes = {
  isLoginPage: PropTypes.bool.isRequired,
  inputData: PropTypes.instanceOf(Array).isRequired,
};

const Card = ({ isLoginPage, inputData }) => {
  const [inputs, setInputs] = useState(
    inputData.reduce((obj, item) => Object.assign(obj, { [item.name]: "" }), {})
  );

  const isAllInputsFilled = () => {
    return Object.values(inputs).some((input) => input === "");
  };

  const handleChangeInputs = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setInputs(
      inputData.reduce(
        (obj, item) => Object.assign(obj, { [item.name]: "" }),
        {}
      )
    );
  }, [inputData]);

  return (
    <S.Container>
      <S.Logo>
        <NavLink to="/">Kalba</NavLink>
      </S.Logo>
      <S.Form onSubmit={handleSubmitForm}>
        <S.Label>{isLoginPage ? "로그인" : "회원가입"}</S.Label>
        {inputData.map((input) => (
          <S.InputWrapper key={input.name} isFilled={inputs[input.name]}>
            <Input
              version="auth"
              name={input.name}
              onChange={handleChangeInputs}
              value={inputs[input.name]}
            />
            <S.InputLabel>{input.value}</S.InputLabel>
          </S.InputWrapper>
        ))}
        <Button type="submit" version="login" disabled={isAllInputsFilled()}>
          {isLoginPage ? "로그인" : "회원가입"}
        </Button>
        <S.Link>
          {isLoginPage ? (
            <NavLink to="/auth/register">회원가입</NavLink>
          ) : (
            <NavLink to="/auth/login">로그인</NavLink>
          )}
        </S.Link>
      </S.Form>
    </S.Container>
  );
};

Card.propTypes = propTypes;

export default Card;
