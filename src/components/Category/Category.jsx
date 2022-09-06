import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import * as S from "./Category.style";

const propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
};

const Category = ({ items }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const handleClickItem = (idx) => {
    navigate(`${items[idx].url}`);
    setActive(idx);
  };

  useEffect(() => {
    const { pathname } = location;
    const visitedIdx = items.findIndex((item) => pathname === item.url);
    setActive(visitedIdx);
  }, [location]);

  return (
    <S.Category>
      <S.List>
        {items.map((item, idx) => (
          <S.Item
            key={item.id}
            value={item.value}
            onClick={() => handleClickItem(idx)}
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
