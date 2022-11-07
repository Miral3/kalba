/* eslint-disable no-param-reassign */
import { useState } from "react";
import { useSearchClanMember } from "./queries/useSearchClanMember";
import useDebounce from "./useDebounce";
import useClickAway from "./useClickAway";

const useSearch = ({
  inputRef,
  listRef,
  onSearch,
  filterOption,
  getInnerText,
}) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);
  const { isLoading, data } = useSearchClanMember({
    keyword: debouncedValue,
    filterOption,
  });
  const [autoCompleteVisible, setAutoCompleteVisible] = useState(true);
  const [activeItem, setActiveItem] = useState(-1);

  const containerRef = useClickAway(() => {
    setAutoCompleteVisible(false);
  });

  const resetAutoComplete = () => {
    listRef.current.scrollTo({ top: 0 });
    setAutoCompleteVisible(false);
    setActiveItem(-1);
  };

  const handleChangeInput = (e) => {
    const { value } = e.target;
    if (!value) {
      setAutoCompleteVisible(false);
    }
    if (!autoCompleteVisible) {
      setAutoCompleteVisible(true);
    }
    setInputValue(value);
  };

  const handleSearch = () => {
    if (!data || !data.length) {
      alert("존재하지 않는 멤버 입니다. 이름 혹은 태그를 다시 확인해주세요");
      return;
    }
    if (activeItem === -1) {
      setActiveItem(0);
      inputRef.current.value = data[0].tag;
      return;
    }
    onSearch(data[activeItem]);
    resetAutoComplete();
  };

  const handleFocusInput = () => {
    setAutoCompleteVisible(true);
  };

  const handleKeyDown = (e) => {
    const node = listRef.current;
    if (!node) return;

    const { length } = node.children;
    if (e.nativeEvent.isComposing || !length) {
      return;
    }
    const itemHeight = node.children[0].scrollHeight;
    let idx = 0;
    let innerText = "";
    switch (e.key) {
      case "ArrowUp":
        idx = activeItem - 1 < 0 ? data.length - 1 : activeItem - 1;
        setActiveItem(idx);
        innerText = getInnerText(node, idx);
        inputRef.current.value = innerText;
        node.scrollTo({ top: itemHeight * idx });
        break;
      case "ArrowDown":
        idx = activeItem + 1 > data.length - 1 ? 0 : activeItem + 1;
        setActiveItem(idx);
        innerText = getInnerText(node, idx);
        inputRef.current.value = innerText;
        node.scrollTo({ top: itemHeight * idx });
        break;
      case "Enter":
        handleSearch();
        break;
      case "Escape":
        resetAutoComplete();
        break;
      default:
        setActiveItem(-1);
        break;
    }
  };

  return {
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
  };
};

export default useSearch;
