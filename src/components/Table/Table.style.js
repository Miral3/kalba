import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Icon } from "../index";
import Common from "../../styles/common";

export const Table = styled.table`
  width: 100%;
  text-align: center;
`;

export const Thead = styled.thead`
  position: ${({ sticky }) => (sticky ? "sticky" : "relative")};
  top: 0;
  background-color: ${({ theme }) => theme.bg.thead};
  color: ${({ theme }) => theme.text.thead};
`;

export const Tbody = styled.tbody`
  background-color: ${({ theme }) => theme.bg.tbody};
  color: ${({ theme }) => theme.text.tbody};

  tr:hover {
    background-color: ${({ version, theme }) =>
      version === "leaderboard" ? theme.hover.tbody : theme.bg.tbody};
  }
`;

export const Tr = styled.tr`
  border: ${({ theme }) => theme.border.tr};
`;

export const Th = styled.th`
  height: 40px;
  vertical-align: middle;
  font-size: ${Common.fontSize.b[2]};

  &:nth-of-type(1) {
    width: ${({ version }) => (version === "leaderboard" ? "auto" : "35%")};
    padding-left: ${({ version }) =>
      version === "leaderboard" ? "12px" : "0"};
  }
  &:nth-of-type(2) {
    padding-left: ${({ version }) =>
      version === "leaderboard" ? "16px" : "0"};
  }
  &:nth-of-type(1),
  &:nth-of-type(2) {
    text-align: ${({ version }) =>
      version === "leaderboard" ? "left" : "center"};
  }
  &:nth-of-type(3),
  &:nth-of-type(4),
  &:nth-of-type(5) {
    width: ${({ version }) => (version === "leaderboard" ? "15%" : "auto")};
  }
`;

export const Td = styled.td`
  height: 40px;
  vertical-align: middle;
  font-size: ${Common.fontSize.b[2]};

  &:nth-of-type(1) {
    padding-left: ${({ version }) =>
      version === "leaderboard" ? "20px" : "0"};
  }
  &:nth-of-type(1),
  &:nth-of-type(2) {
    text-align: ${({ version }) =>
      version === "leaderboard" ? "left" : "center"};
  }
`;

export const Link = styled(NavLink)`
  display: flex;
  align-items: center;
`;

export const Trophy = styled.img`
  width: 25px;
  height: 25px;
  padding-right: 8px;
`;

export const Delete = styled(Icon)`
  font-size: ${Common.fontSize.h[1]};
  color: ${({ theme }) => theme.text.tbody};
`;
