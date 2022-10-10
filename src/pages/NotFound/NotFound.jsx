import React from "react";
import * as S from "./NotFound.style";

const NotFound = () => {
  return (
    <S.Section>
      <S.Container>
        <S.Title>404 Not Found!</S.Title>
        <S.NotFound src="/img/coc/not_found.png" alt="notFound" />
        <S.Description>요청하신 페이지를 찾을 수 없어요!</S.Description>
      </S.Container>
    </S.Section>
  );
};

export default NotFound;
