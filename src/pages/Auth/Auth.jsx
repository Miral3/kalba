import React from "react";
import { useLocation } from "react-router-dom";
import { Login, Signup } from "./components";
import * as S from "./Auth.style";

const Auth = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <S.Container>
      {pathname.includes("login") ? <Login /> : <Signup />}
    </S.Container>
  );
};

export default Auth;
