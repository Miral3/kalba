import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as S from "./Header.style";
import Common from "../../styles/common";
import { Text, Button, Icon } from "../index";
import { Navigation, Search, AccountInfo } from "./Components";

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const profileButtonRef = useRef(null);
  const accountInfoRef = useRef(null);
  const [accountInfoVisible, setAccountInfoVisible] = useState(false);
  /**
   * @Todo recoil 사용하여 로그인 여부 받아오기
   */
  const isLoggedIn = true;

  const handleClickProfile = () => {
    setAccountInfoVisible(!accountInfoVisible);
  };

  const handleCloseAccountInfo = (e) => {
    const accountInfo = accountInfoRef.current;
    const profileButton = profileButtonRef.current;

    if (!accountInfo || !profileButton) return;
    if (!accountInfo.contains(e.target) && !profileButton.contains(e.target)) {
      setAccountInfoVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleCloseAccountInfo);
    return () => {
      window.removeEventListener("click", handleCloseAccountInfo);
    };
  }, []);

  if (pathname.includes("auth")) {
    return;
  }

  console.log(accountInfoVisible);
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
        <S.AuthWrapper>
          {isLoggedIn ? (
            <>
              <Button onClick={handleClickProfile} ref={profileButtonRef}>
                <Icon
                  size={Common.fontSize.t[0]}
                  color={Common.colors.white[0]}
                >
                  account_circle
                </Icon>
              </Button>
              <AccountInfo
                visible={accountInfoVisible}
                setVisible={setAccountInfoVisible}
                ref={accountInfoRef}
              />
            </>
          ) : (
            <S.LoginLink to="auth/login">로그인</S.LoginLink>
          )}
        </S.AuthWrapper>
        <Search />
      </S.LogoInsertContainer>
      <Navigation />
    </S.Header>
  );
};

export default Header;
