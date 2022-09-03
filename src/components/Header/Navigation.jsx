import React, { useState } from "react";
import * as S from "./Header.style";

const Navigation = () => {
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
