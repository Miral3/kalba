import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import * as S from "./Header.style";
import Common from "../../styles/common";
import { Text, Button } from "../index";
import { Navigation, Search } from "./Components";

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  /**
   * @Todo recoil 사용하여 로그인 여부 받아오기
   */
  const isLoggedIn = false;

  const handleClickLoginButton = () => {
    navigate("/auth/login");
  };

  /**
   * @Todo recoil 사용하여 로그인 여부 변경,
   * localStorage 토큰 제거
   */
  const handleClickLogoutButton = () => {};

  if (pathname.includes("auth")) {
    return;
  }

  return (
    <S.Header>
      <S.LogoInsertContainer>
        <S.LogoContainer>
          <NavLink to="/">
            <S.Logo>Kalba</S.Logo>
          </NavLink>
          <NavLink to="/">
            <S.LogoBlock>
              <Text
                size={Common.fontSize.h[2]}
                color={Common.colors.white[0]}
                weight={700}
              >
                칼없는 바바리안
              </Text>
            </S.LogoBlock>
          </NavLink>
        </S.LogoContainer>
        <S.ButtonWrapper>
          {isLoggedIn ? (
            <Button onClick={handleClickLogoutButton}>로그아웃</Button>
          ) : (
            <Button onClick={handleClickLoginButton}>로그인</Button>
          )}
        </S.ButtonWrapper>
        <Search />
      </S.LogoInsertContainer>
      <Navigation />
    </S.Header>
  );
};

export default Header;