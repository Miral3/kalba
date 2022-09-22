/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { useState, useEffect } from "react";
import useClickAway from "./useClickAway";

const useSearch = ({
  inputRef,
  listRef,
  data,
  onSubmit,
  filterOption,
  getInnerText,
}) => {
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [activeItem, setActiveItem] = useState(-1);
  const [autoCompleteVisible, setAutoCompleteVisible] = useState(false);
  const containerRef = useClickAway(() => {
    setAutoCompleteVisible(false);
  });

  const resetAutoComplete = () => {
    listRef.current.scrollTo({ top: 0 });
    setAutoCompleteVisible(false);
    setActiveItem(-1);
  };

  const handleSelect = () => {
    onSubmit(autoCompleteData, activeItem);
    resetAutoComplete();
  };

  const handleFilter = () => {
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
      case "Enter":
        handleSelect();
        break;
      case "Escape":
        resetAutoComplete();
        break;
      default:
        break;
    }
  };

  // const handleCloseAutoComplete = (e) => {
  //   const element = searchRef.current;
  //   if (!element) return;
  //   if (!element.contains(e.target)) {
  //     setAutoCompleteVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("click", handleCloseAutoComplete);
  //   return () => {
  //     window.removeEventListener("click", handleCloseAutoComplete);
  //   };
  // }, []);

  return {
    autoCompleteData,
    activeItem,
    autoCompleteVisible,
    handleSelect,
    handleFilter,
    handleKeyDown,
    resetAutoComplete,
    containerRef,
  };
};

export default useSearch;
