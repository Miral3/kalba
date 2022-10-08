import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import Common from "../../styles/common";

export const Category = styled.div`
  width: 100%;
  border: ${({ theme }) => theme.border.category};
  border-top: 2px solid ${Common.colors.red[0]};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.bg.container};
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 4px 10px;
`;

export const Link = styled(NavLink)`
  height: 40px;
  padding: 0 16px;
  border-radius: 4px;
  background-color: ${({ active, theme }) =>
    active ? Common.colors.red[0] : theme.bg.container};
  line-height: 40px;
  font-size: 12px;
  font-weight: bold;
  color: ${({ active, theme }) =>
    active ? Common.colors.white[0] : theme.text.text};
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ active, theme }) =>
      active ? Common.colors.red[0] : theme.hover.categoryItem};
  }
`;
