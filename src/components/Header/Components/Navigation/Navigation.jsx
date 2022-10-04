import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  defaultNavigationItems,
  adminNavigationItems,
} from "../../../../assets/data";
import * as S from "./Navigation.style";

const Navigation = () => {
  const location = useLocation();
  /**
   * @Todo recoil로 받아오기
   */
  const isAdmin = true;
  const [active, setActive] = useState(0);
  const [items, setItems] = useState(
    isAdmin ? adminNavigationItems : defaultNavigationItems
  );

  const handleClickItem = (idx) => {
    setActive(idx);
  };

  useEffect(() => {
    const { pathname } = location;
    const visitedIdx = items.findIndex((item) =>
      item.url.includes(pathname.split("/")[1])
    );
    setActive(visitedIdx);
  }, [location]);

  useEffect(() => {
    const nextItems = isAdmin ? adminNavigationItems : defaultNavigationItems;
    setItems(nextItems);
  }, [isAdmin]);

  return (
    <S.Navigation>
      <S.List>
        {items.map((item, idx) => (
          <S.Item key={item.id} onClick={() => handleClickItem(idx)}>
            <S.Link to={item.url} active={`${active === idx}`}>
              {item.name}
            </S.Link>
          </S.Item>
        ))}
      </S.List>
    </S.Navigation>
  );
};

export default Navigation;
