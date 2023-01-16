import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import Common from "../../styles/common";
import { Text, Icon } from "../index";
import Button from "../Button/Button";

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

export const StyledButton = styled(Button)`
  margin-right: 24px;
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
  color: ${Common.colors.white[0]};
  cursor: pointer;

  ${Common.mediaQuery.mobile} {
    display: block;
  }
`;

export const AuthWrapper = styled.div`
  position: absolute;
  top: ${({ isLoggedIn }) => (isLoggedIn ? "14px" : "15px")};
  right: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`;

export const Mode = styled(Icon)`
  font-size: ${Common.fontSize.t[1]};
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
  color: ${Common.colors.white[1]};

  &:hover {
    filter: brightness(1.1);
  }
`;

export const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  margin-left: 17.74px;
  border-radius: 50%;
  background-color: ${Common.colors.white[1]};
`;

export const Profile = styled(Icon)`
  color: ${Common.colors.indigo[0]};
  font-size: ${Common.fontSize.t[1]};
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
`;

export const LoginLink = styled(NavLink)`
  padding: 10px 8px;
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
