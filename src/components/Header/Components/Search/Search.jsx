import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Search.style";
import Common from "../../../../styles/common";
import { Input, Icon, AutoComplete } from "../../../index";
import useSearch from "../../../../hooks/useSearch";
import { userInfo } from "../../../../assets/dummyData";

const Search = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const filterOption = ["name", "tag"];

  const getInnerText = (node, idx) => {
    return node.children[idx].children[0].innerText;
  };

  const findUser = () => {
    const value = inputRef.current.value.toLowerCase();
    return userInfo.find(
      (member) =>
        member.name.toLowerCase() === value ||
        member.tag.toLowerCase() === value
    );
  };

  const handleSubmitSearch = () => {
    const value = inputRef.current.value.toLowerCase();
    const searchedUser = findUser();
    inputRef.current.value = "";
    if (!searchedUser) {
      navigate(`/profile/${value}`);
      return;
    }
    navigate(`/profile/${searchedUser.tag.substr(1)}`);
  };

  const {
    autoCompleteData,
    activeItem,
    autoCompleteVisible,
    handleSelect,
    handleFilter,
    handleKeyDown,
    resetAutoComplete,
    containerRef,
  } = useSearch({
    inputRef,
    listRef,
    data: userInfo,
    onSubmit: handleSubmitSearch,
    filterOption,
    getInnerText,
  });

  const handleClickItem = (item) => {
    resetAutoComplete();
    inputRef.current.value = "";
    navigate(`/profile/${item.tag.substr(1)}`);
  };

  return (
    <S.Container ref={containerRef}>
      <S.Form onSubmit={handleSelect}>
        <S.InputWrapper>
          <Input
            ref={inputRef}
            placeholder="이름, 태그번호 검색"
            onChange={handleFilter}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </S.InputWrapper>
        <S.StyledButton type="submit" onClick={handleSelect}>
          <Icon size={Common.fontSize.b[0]} color={Common.colors.red[2]}>
            search
          </Icon>
        </S.StyledButton>
      </S.Form>
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
