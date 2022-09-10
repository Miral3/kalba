import React from "react";
import { useLocation } from "react-router-dom";
import * as S from "./Footer.style";

const Footer = () => {
  const location = useLocation();
  const { pathname } = location;

  if (pathname.includes("auth")) {
    return;
  }
  return (
    <S.Footer>
      <S.Logo to="/">Kalba</S.Logo>
      <S.Content>
        <S.About to="/about">[About us]</S.About>
        <S.Copyright>© Kalba. All Rights Reserved.</S.Copyright>
      </S.Content>
    </S.Footer>
  );
};

export default Footer;
