import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import Common from "../../styles/common";
import { Text } from "../index";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 170px;
  background-color: ${Common.colors.indigo[0]};

  ${Common.mediaQuery.tablet} {
    height: 200px;
  }
`;

export const LogoInsertContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;

  ${Common.mediaQuery.tablet} {
    height: 150px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 24px;
`;

export const Logo = styled(Text)`
  font-size: ${Common.fontSize.h[0]};
  font-weight: bold;
  font-family: "supercell+NotoSansKR";
  color: ${Common.colors.white[0]};
  cursor: pointer;

  ${Common.mediaQuery.mobile} {
    font-size: ${Common.fontSize.l[1]};
  }
`;

export const LogoBlock = styled.div`
  display: none;
  margin-left: 12px;
  padding: 10px;
  border-radius: 6px;
  background-color: ${Common.colors.red[0]};
  cursor: pointer;

  ${Common.mediaQuery.mobile} {
    display: block;
  }
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 24px;
`;

export const Search = styled.div`
  display: flex;
  width: calc(100% - 50px);
  height: 32px;
  margin: auto;

  ${Common.mediaQuery.tablet} {
    width: 260px;
    margin: 0;
  }
`;

export const SearchInner = styled.div`
  flex-grow: 1;
  position: relative;
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 8px;
  cursor: pointer;
`;

export const NavigationContainer = styled.nav`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  background-color: ${Common.colors.indigo[1]};
`;

export const List = styled.ul`
  display: flex;
  align-items: center;
  height: 50px;
  padding-left: 24px;
`;

export const Item = styled.li`
  margin-left: 24px;

  &:nth-of-type(1) {
    margin-left: 0;
  }
`;

export const Link = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  color: ${({ active }) =>
    active === "true" ? Common.colors.white[0] : Common.colors.gray[4]};
  text-decoration: none;
  font-size: ${Common.fontSize.h[2]};
  font-weight: bold;

  &:hover {
    color: ${Common.colors.white[0]};
  }

  &::after {
    content: "";
    position: absolute;
    top: 23px;
    width: 100%;
    height: 3px;
    background-color: ${Common.colors.white[0]};
    opacity: ${({ active }) => (active === "true" ? 1 : 0)};
  }

  &:hover::after {
    opacity: 1;
  }
`;
