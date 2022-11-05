import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Search.style";
import Common from "../../../../styles/common";
import { Input, Icon, AutoComplete } from "../../../index";
import useSearch from "../../../../hooks/useSearch";

const Search = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const filterOption = ["name", "tag"];

  const getInnerText = (node, idx) => {
    return node.children[idx].children[0].innerText;
  };

  const handleSubmitSearch = (searchedUser) => {
    inputRef.current.value = "";
    navigate(`/profile/${searchedUser.tag.substr(1)}`);
  };

  const {
    data,
    isLoading,
    activeItem,
    autoCompleteVisible,
    containerRef,
    setAutoCompleteVisible,
    handleChangeInput,
    handleSearch,
    handleKeyDown,
    handleFocusInput,
  } = useSearch({
    inputRef,
    listRef,
    onSearch: handleSubmitSearch,
    filterOption,
    getInnerText,
  });

  const handleClickAutoCompleteItem = (item) => {
    inputRef.current.value = "";
    setAutoCompleteVisible(false);
    navigate(`/profile/${item.tag.substr(1)}`);
  };

  return (
    <S.Container ref={containerRef}>
      <S.Search>
        <S.InputWrapper>
          <Input
            ref={inputRef}
            placeholder="이름, 태그번호 검색"
            onChange={handleChangeInput}
            onKeyDown={(e) => handleKeyDown(e)}
            onFocus={handleFocusInput}
          />
        </S.InputWrapper>
        <S.StyledButton onClick={handleSearch}>
          <Icon size={Common.fontSize.b[0]} color={Common.colors.red[2]}>
            search
          </Icon>
        </S.StyledButton>
      </S.Search>
      {data && (
        <AutoComplete
          ref={listRef}
          isLoading={isLoading}
          data={data}
          active={activeItem}
          visible={autoCompleteVisible}
          onClick={handleClickAutoCompleteItem}
        />
      )}
    </S.Container>
  );
};

export default Search;
