import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useRecoilValue } from "recoil";
import { loginStatus } from "../../recoil/authentication";
import * as S from "./Header.style";
import Common from "../../styles/common";
import { Text, Button } from "../index";
import { Navigation, AccountInfo, Search } from "./Components";

const propTypes = {
  onOpen: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
  hadleClickDarkMode: PropTypes.func.isRequired,
};

const Header = ({ onOpen, isDark, hadleClickDarkMode }) => {
  const location = useLocation();
  const { pathname } = location;
  const isAdminPage = pathname.includes("admin");
  const profileButtonRef = useRef(null);
  const accountInfoRef = useRef(null);
  const [accountInfoVisible, setAccountInfoVisible] = useState(false);
  const isLoggedIn = useRecoilValue(loginStatus);

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

  useEffect(() => {
    if (accountInfoVisible) {
      setAccountInfoVisible(false);
    }
  }, [location]);

  if (pathname.includes("auth")) {
    return;
  }

  return (
    <S.Header isAdminPage={isAdminPage}>
      <S.LogoInsertContainer isAdminPage={isAdminPage}>
        <S.LogoContainer>
          {isAdminPage && (
            <Button
              onClick={() => onOpen()}
              hover
              style={{ marginRight: "24px" }}
            >
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
          <Button onClick={() => hadleClickDarkMode()}>
            <S.Mode className="material-symbols-outlined">
              {isDark ? "dark_mode" : "light_mode"}
            </S.Mode>
          </Button>
          {isLoggedIn ? (
            <>
              <Button onClick={handleClickProfile} ref={profileButtonRef}>
                <S.ProfileWrapper>
                  <S.Profile className="material-symbols-outlined">
                    person
                  </S.Profile>
                </S.ProfileWrapper>
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

Header.propTypes = propTypes;

export default Header;
