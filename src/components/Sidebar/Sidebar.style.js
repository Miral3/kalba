import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import Common from "../../styles/common";
import { Text, Icon, Button } from "../index";

export const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: ${({ visible }) => (visible ? "block" : "none")};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: auto;
  height: 100vh;
  background-color: ${Common.colors.indigo[0]};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  transform: ${({ visible }) =>
    visible ? "translate3d(0, 0, 0)" : "translate3d(-100%, 0, 0)"};
  transition-duration: 200ms;
  z-index: 201;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 24px;
`;

export const StyledButton = styled(Button)`
  margin-right: 24px;
`;

export const Logo = styled(NavLink)`
  font-size: ${Common.fontSize.h[0]};
  font-weight: bold;
  font-family: "supercell+NotoSansKR";
  color: ${Common.colors.white[0]};

  ${Common.mediaQuery.mobile} {
    font-size: ${Common.fontSize.t[1]};
  }
`;

export const Menu = styled(Icon)`
  font-size: ${Common.fontSize.l[2]};
  color: ${Common.colors.white[0]};
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
`;

export const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  background-color: ${({ active }) =>
    active ? Common.colors.red[0] : Common.colors.indigo[0]};
  &:hover {
    background-color: ${Common.colors.red[0]};
  }
`;

export const StyledIcon = styled(Icon)`
  color: ${Common.colors.white[0]};
  font-size: ${Common.fontSize.h[0]};
`;

export const Name = styled(Text)`
  color: ${Common.colors.white[0]};
  font-size: ${Common.fontSize.h[1]};
`;
