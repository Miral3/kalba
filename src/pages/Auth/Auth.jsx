import React from "react";
import { useParams } from "react-router-dom";
import { Login, Signup } from "./components";
import * as S from "./Auth.style";

const Auth = () => {
  const { category } = useParams();

  return (
    <S.Container>{category === "login" ? <Login /> : <Signup />}</S.Container>
  );
};

export default Auth;
