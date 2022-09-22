import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import * as S from "./Search.style";
import Common from "../../styles/common";
import { Input, Icon, AutoComplete } from "../index";
import useSearch from "../../hooks/useSearch";

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  onSubmit: PropTypes.func.isRequired,
  filterOption: PropTypes.instanceOf(Array).isRequired,
  getInnerText: PropTypes.func.isRequired,
};

const Search = ({ data, onSubmit, filterOption, getInnerText }) => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
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
    data,
    onSubmit,
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

Search.propTypes = propTypes;

export default Search;
