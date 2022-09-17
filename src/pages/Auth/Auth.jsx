import React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "./components";
import * as S from "./Auth.style";

const Auth = () => {
  const location = useLocation();
  const { pathname } = location;
  const isLoginPage = pathname.includes("login");

  const inputData = isLoginPage
    ? [
        { name: "id", value: "아이디" },
        { name: "password", value: "비밀번호" },
      ]
    : [
        { name: "tag", value: "태그번호" },
        { name: "id", value: "아이디" },
        { name: "password", value: "비밀번호" },
        { name: "passwordConfirm", value: "비밀번호 확인" },
      ];

  return (
    <S.Container>
      <Card isLoginPage={isLoginPage} inputData={inputData} />
    </S.Container>
  );
};

export default Auth;
