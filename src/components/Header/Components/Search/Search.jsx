import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Search.style";
import Common from "../../../../styles/common";
import { Input, Icon, AutoComplete } from "../../../index";
import useSearch from "../../../../hooks/useSearch";
import { members } from "../../../../assets/dummyData";

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
    return members.find(
      (member) =>
        member.name.toLowerCase() === value ||
        member.tag.toLowerCase() === value
    );
  };

  const handleSubmitSearch = () => {
    const searchedUser = findUser();
    inputRef.current.value = "";
    if (!searchedUser) {
      alert("존재하지 않는 멤버 입니다. 이름 혹은 태그를 다시 확인해주세요");
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
    data: members,
    onSubmit: handleSubmitSearch,
    filterOption,
    getInnerText,
  });

  const handleClickItem = (item) => {
    resetAutoComplete();
    inputRef.current.value = item.name;
    navigate(`/profile/${item.tag.substr(1)}`);
  };

  return (
    <S.Container ref={containerRef}>
      <S.Search>
        <S.SearchInner>
          <Input
            ref={inputRef}
            placeholder="이름, 태그번호 검색"
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
