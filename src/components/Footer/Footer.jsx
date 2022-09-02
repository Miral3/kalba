import React from "react";
import * as S from "./Footer.style";

const Footer = () => {
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
