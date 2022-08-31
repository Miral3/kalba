import React, { useState } from "react";
import PropTypes from "prop-types";
import * as S from "./Category.style";

const propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
};

const Category = ({ items }) => {
  const [active, setActive] = useState(0);

  /**
   *
   * @todo 클릭했을 때 url 변경기능 추가
   * e.target.getAttribute("value")
   */
  const handleClickItem = (e, idx) => {
    setActive(idx);
  };

  return (
    <S.Category>
      <S.List>
        {items.map((item, idx) => (
          <S.Item
            key={item.id}
            value={item.value}
            onClick={(e) => handleClickItem(e, idx)}
            active={active === idx}
          >
            {item.name}
          </S.Item>
        ))}
      </S.List>
    </S.Category>
  );
};

Category.propTypes = propTypes;

export default Category;
