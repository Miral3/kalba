import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Login, Signup } from "./components";
import * as S from "./Auth.style";

const Auth = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!["login", "signup"].find((item) => item === category)) {
      navigate("/404-not-found");
    }
  }, []);

  return (
    <S.Container>{category === "login" ? <Login /> : <Signup />}</S.Container>
  );
};

export default Auth;
