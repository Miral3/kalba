import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import Common from "../../../../styles/common";

export const Navigation = styled.nav`
  width: 100%;
  height: 50px;
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
