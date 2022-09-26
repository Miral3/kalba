import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import Common from "../../styles/common";

export const Category = styled.div`
  width: 100%;
  border: 1px solid ${Common.colors.gray[4]};
  border-top: 2px solid ${Common.colors.red[0]};
  box-sizing: border-box;
  background-color: ${Common.colors.gray[1]};
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 4px 10px;
`;

export const Link = styled(NavLink)`
  height: 40px;
  padding: 0 16px;
  border-radius: 4px;
  background-color: ${({ active }) =>
    active ? Common.colors.red[0] : Common.colors.gray[1]};
  line-height: 40px;
  font-size: 12px;
  font-weight: bold;
  color: ${({ active }) =>
    active ? Common.colors.white[0] : Common.colors.black[0]};
  text-align: center;
  cursor: pointer;
`;
