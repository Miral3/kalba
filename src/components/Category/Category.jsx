import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import * as S from "./Category.style";

const propTypes = {
  items: PropTypes.instanceOf(Array).isRequired,
};

const Category = ({ items }) => {
  const location = useLocation();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const { pathname } = location;
    const visitedIdx = items.findIndex((item) => pathname === item.url);
    setActive(visitedIdx);
  }, [location]);

  return (
    <S.Category>
      <S.Nav>
        {items.map((item, idx) => (
          <S.Link
            key={item.id}
            to={items[idx].url}
            value={item.value}
            active={active === idx}
          >
            {item.name}
          </S.Link>
        ))}
      </S.Nav>
    </S.Category>
  );
};

Category.propTypes = propTypes;

export default Category;
