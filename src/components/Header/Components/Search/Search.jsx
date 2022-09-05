import React from "react";
import * as S from "./Search.style";
import Common from "../../../../styles/common";
import { Input, Icon } from "../../../index";

const Search = () => {
  return (
    <S.Search>
      <S.SearchInner>
        <Input placeholder="이름 검색" />
        <S.IconWrapper>
          <Icon size={Common.fontSize.b[0]} color={Common.colors.red[2]}>
            search
          </Icon>
        </S.IconWrapper>
      </S.SearchInner>
    </S.Search>
  );
};

export default Search;
