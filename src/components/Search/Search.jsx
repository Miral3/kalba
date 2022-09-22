import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Search.style";
import Common from "../../styles/common";
import { Input, Icon, AutoComplete } from "../index";
import useSearch from "../../hooks/useSearch";
import { members } from "../../assets/dummyData";

const Search = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const filterOption = ["name"];

  const getInnerText = (node, idx) => {
    return node.children[idx].children[0].innerText;
  };

  const handleSubmitSearch = (autoCompleteData, activeItem) => {
    const idx = activeItem === -1 ? 0 : activeItem;
    inputRef.current.value = autoCompleteData[idx].name;
    navigate(`/profile/${autoCompleteData[idx].tag.slice(1)}`);
  };
  const {
    autoCompleteData,
    activeItem,
    autoCompleteVisible,
    handleSelect,
    handleFilter,
    handleKeyDown,
    resetAutoComplete,
  } = useSearch({
    searchRef,
    inputRef,
    listRef,
    data: members,
    onSubmit: handleSubmitSearch,
    filterOption,
    getInnerText,
  });

  const handleClickItem = (item) => {
    resetAutoComplete();
    inputRef.current.value = item.name;
    navigate(`/profile/${item.tag}`);
  };

  return (
    <S.Container ref={searchRef}>
      <S.Search>
        <S.SearchInner>
          <Input
            ref={inputRef}
            placeholder="이름 검색"
            onChange={handleFilter}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <S.StyledButton onClick={handleSelect}>
            <Icon size={Common.fontSize.b[0]} color={Common.colors.red[2]}>
              search
            </Icon>
          </S.StyledButton>
        </S.SearchInner>
      </S.Search>
      <AutoComplete
        ref={listRef}
        data={autoCompleteData}
        active={activeItem}
        visible={autoCompleteVisible}
        onClick={handleClickItem}
      />
    </S.Container>
  );
};

export default Search;
