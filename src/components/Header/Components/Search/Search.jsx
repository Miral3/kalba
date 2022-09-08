import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Search.style";
import Common from "../../../../styles/common";
import { Input, Icon } from "../../../index";
import { AutoComplete } from "..";
import { members } from "../../../../assets/dummyData";

const Search = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [autoCompleteName, setAutoCompleteName] = useState([]);
  const [activeItem, setActiveItem] = useState(-1);
  const [autoCompleteVisible, setAutoCompleteVisible] = useState(false);

  const resetAutoComplete = () => {
    listRef.current.scrollTo({ top: 0 });
    setAutoCompleteVisible(false);
    setActiveItem(-1);
  };

  const getInnerText = (node) => {
    return node.innerText.split("-")[0].replace(/ /g, "");
  };

  /**
   * @Todo recoil에서 클랜원 불러와서 비교하기
   * 존재한다면 프로필 페이지로 이동, 존재하지 않는다면 경고창
   */
  const handleSubmitName = (e) => {
    e.preventDefault();
    // console.log(inputRef.current.value);
    inputRef.current.value = "";
    resetAutoComplete();
  };

  const handleChangeInput = () => {
    const keyword = inputRef.current.value;
    const filterMembers = members.filter(
      (member) => member.name.toLowerCase().indexOf(keyword) >= 0
    );

    if (!keyword) {
      setAutoCompleteName([]);
      resetAutoComplete();
      return;
    }

    setAutoCompleteVisible(true);
    setAutoCompleteName(filterMembers);
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
        idx = activeItem - 1 < 0 ? autoCompleteName.length - 1 : activeItem - 1;
        setActiveItem(idx);
        innerText = getInnerText(node.children[idx]);
        inputRef.current.value = innerText;
        node.scrollTo({ top: itemHeight * idx });
        break;
      case "ArrowDown":
        idx = activeItem + 1 > autoCompleteName.length - 1 ? 0 : activeItem + 1;
        setActiveItem(idx);
        innerText = getInnerText(node.children[idx]);
        inputRef.current.value = innerText;
        node.scrollTo({ top: itemHeight * idx });
        break;
      case "Enter":
        if (activeItem === -1) return;
        navigate(`/profile/${autoCompleteName[activeItem].tag.slice(1)}`);
        resetAutoComplete();
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
        data={autoCompleteName}
        active={activeItem}
        visible={autoCompleteVisible}
      />
    </S.Container>
  );
};

export default Search;
