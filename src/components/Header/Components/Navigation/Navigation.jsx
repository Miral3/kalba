import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { adminState } from "../../../../recoil/authentication";
import {
  defaultNavigationItems,
  adminNavigationItems,
} from "../../../../assets/data";
import * as S from "./Navigation.style";

const Navigation = () => {
  const location = useLocation();
  const isAdmin = useRecoilValue(adminState);
  const [active, setActive] = useState(0);
  const [items, setItems] = useState([]);

  const handleClickItem = (idx) => {
    setActive(idx);
  };

  const checkActiveItem = (navItems) => {
    const { pathname } = location;
    const visitedIdx = navItems.findIndex((item) =>
      item.url.includes(pathname.split("/")[1])
    );
    setActive(visitedIdx);
  };

  useEffect(() => {
    const nextItems = isAdmin ? adminNavigationItems : defaultNavigationItems;
    setItems(nextItems);
    checkActiveItem(nextItems);
  }, [isAdmin]);

  useEffect(() => {
    if (items.length) {
      checkActiveItem(items);
    }
  }, [location]);

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
