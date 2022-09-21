import React from "react";
import { useLocation } from "react-router-dom";
import { Login, Register } from "./components";
import * as S from "./Auth.style";

const Auth = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <S.Container>
      {pathname.includes("login") ? <Login /> : <Register />}
    </S.Container>
  );
};

export default Auth;
