import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import Common from "../../styles/common";
import { Text, Icon } from "../index";

export const Header = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${Common.colors.indigo[0]};
`;

export const LogoInsertContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ isAdminPage }) => (isAdminPage ? 0 : "16px")};

  ${Common.mediaQuery.tablet} {
    flex-direction: row;
    justify-content: ${({ isAdminPage }) =>
      isAdminPage ? "stretch" : "space-around"};
    align-items: center;
    height: ${({ isAdminPage }) => (isAdminPage ? "auto" : "120px")};
    margin: 0;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  height: auto;
  margin: 16px 24px;
`;

export const Menu = styled(Icon)`
  font-size: ${Common.fontSize.l[2]};
  color: ${Common.colors.white[0]};
`;

export const Logo = styled(Text)`
  font-size: ${Common.fontSize.h[0]};
  font-weight: bold;
  font-family: "supercell+NotoSansKR";
  color: ${Common.colors.white[0]};
  cursor: pointer;

  ${Common.mediaQuery.mobile} {
    font-size: ${Common.fontSize.t[1]};
  }
`;

export const LogoBlock = styled.div`
  display: none;
  margin-left: 12px;
  padding: 8px;
  border-radius: 6px;
  background-color: ${Common.colors.red[0]};
  cursor: pointer;

  ${Common.mediaQuery.mobile} {
    display: block;
  }
`;

export const AuthWrapper = styled.div`
  position: absolute;
  top: ${({ isLoggedIn }) => (isLoggedIn ? "14px" : "18px")};
  right: 24px;

  ${Common.mediaQuery.mobile} {
    ${({ isLoggedIn }) => (isLoggedIn ? "16px" : "24px")};
  }
`;

export const Profile = styled(Icon)`
  font-size: ${Common.fontSize.l[2]};
  color: ${Common.colors.white[0]};

  ${Common.mediaQuery.mobile} {
    font-size: ${Common.fontSize.t[0]};
  }
`;

export const LoginLink = styled(NavLink)`
  padding: 8px;
  border: 0;
  border-radius: 4px;
  background-color: ${Common.colors.indigo[1]};
  font-size: ${Common.fontSize.c[1]};
  font-weight: 600;
  color: ${Common.colors.white[0]};
  transition: all 0.2s ease 0s;

  &:hover {
    filter: brightness(1.1);
  }

  ${Common.mediaQuery.mobile} {
    padding: 10px;
    font-size: ${Common.fontSize.b[2]};
  }
`;
