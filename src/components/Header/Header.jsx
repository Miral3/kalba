import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import * as S from "./Header.style";
import Common from "../../styles/common";
import { Text, Button } from "../index";
import { Navigation, AccountInfo, Search } from "./Components";

const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const isAdminPage = pathname.includes("admin");
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

  return (
    <S.Header isAdminPage={isAdminPage}>
      <S.LogoInsertContainer isAdminPage={isAdminPage}>
        <S.LogoContainer>
          {isAdminPage && (
            <Button>
              <S.Menu className="material-symbols-outlined">menu</S.Menu>
            </Button>
          )}
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
        <S.AuthWrapper isLoggedIn={isLoggedIn}>
          {isLoggedIn ? (
            <>
              <Button onClick={handleClickProfile} ref={profileButtonRef}>
                <S.Profile className="material-symbols-outlined">
                  account_circle
                </S.Profile>
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
        {!isAdminPage && <Search />}
      </S.LogoInsertContainer>
      {!isAdminPage && <Navigation />}
    </S.Header>
  );
};

export default Header;
