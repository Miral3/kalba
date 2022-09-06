import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./Navigation.style";

const Navigation = () => {
  const location = useLocation();
  const [active, setActive] = useState(0);

  const items = [
    {
      id: 1,
      name: "메인",
      url: "/",
    },
    {
      id: 2,
      name: "순위표",
      url: "/leaderboards/donations",
    },
    {
      id: 3,
      name: "기준표",
      url: "/standardTable/heroes",
    },
  ];

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
