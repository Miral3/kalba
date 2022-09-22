import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as S from "./Search.style";
import Common from "../../styles/common";
import { Input, Icon, AutoComplete } from "../index";

const propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  onSubmit: PropTypes.func.isRequired,
  filterOption: PropTypes.instanceOf(Array).isRequired,
  getInnerText: PropTypes.func.isRequired,
};

const Search = ({ data, onSubmit, filterOption, getInnerText }) => {
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [activeItem, setActiveItem] = useState(-1);
  const [autoCompleteVisible, setAutoCompleteVisible] = useState(false);

  const resetAutoComplete = () => {
    listRef.current.scrollTo({ top: 0 });
    setAutoCompleteVisible(false);
    setActiveItem(-1);
  };

  const handleSubmitName = (e) => {
    e.preventDefault();
    onSubmit(autoCompleteData, activeItem);
    inputRef.current.value = "";
    resetAutoComplete();
  };

  const handleChangeInput = () => {
    const keyword = inputRef.current.value;
    const filteredData = data.filter((item) => {
      return filterOption.some(
        (key) => item[key]?.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
      );
    });

    if (!keyword) {
      setAutoCompleteData([]);
      resetAutoComplete();
      return;
    }

    setAutoCompleteVisible(true);
    setAutoCompleteData(filteredData);
  };

  const handleKeyDown = (e) => {
    const node = listRef.current;
    const { length } = node.children;
    if (e.isComposing || !length) {
      return;
    }

    const itemHeight = node.children[0].scrollHeight;
    let idx = 0;
    let innerText = "";
    switch (e.key) {
      case "ArrowUp":
        idx = activeItem - 1 < 0 ? autoCompleteData.length - 1 : activeItem - 1;
        setActiveItem(idx);
        innerText = getInnerText(node, idx);
        inputRef.current.value = innerText;
        node.scrollTo({ top: itemHeight * idx });
        break;
      case "ArrowDown":
        idx = activeItem + 1 > autoCompleteData.length - 1 ? 0 : activeItem + 1;
        setActiveItem(idx);
        innerText = getInnerText(node, idx);
        inputRef.current.value = innerText;
        node.scrollTo({ top: itemHeight * idx });
        break;
      case "Escape":
        resetAutoComplete();
        break;
      default:
        break;
    }
  };

  const handleCloseAutoComplete = (e) => {
    const element = searchRef.current;
    if (!element) return;
    if (!element.contains(e.target)) {
      setAutoCompleteVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseAutoComplete);
    return () => {
      window.removeEventListener("click", handleCloseAutoComplete);
    };
  }, []);

  return (
    <S.Container ref={searchRef}>
      <S.Search onSubmit={(e) => handleSubmitName(e)}>
        <S.SearchInner>
          <Input
            ref={inputRef}
            placeholder="이름 검색"
            onChange={handleChangeInput}
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <S.StyledButton type="submit">
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
      />
    </S.Container>
  );
};

Search.propTypes = propTypes;

export default Search;
