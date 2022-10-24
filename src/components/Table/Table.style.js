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
  color: ${({ theme }) => theme.text.tbody};

  tr {
    background-color: ${({ theme }) => theme.bg.tbody};
  }
  tr:hover {
    background-color: ${({ version, theme }) =>
      version === "leaderboard" ? theme.hover.tbody : theme.bg.tbody};
  }
`;

export const SkeletonTbody = styled.tbody`
  background-color: ${({ theme }) => theme.bg.tbody};
  color: ${({ theme }) => theme.text.tbody};
`;

export const Tr = styled.tr`
  display: ${({ isDragging }) => isDragging && "table"};
  border: ${({ theme }) => theme.border.tr};
`;

export const Th = styled.th`
  height: 40px;
  vertical-align: middle;
  font-size: ${Common.fontSize.b[2]};
  cursor: ${({ active }) => active && "pointer"};

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

export const SortWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;

  &:hover span {
    color: ${({ theme }) => theme.text.thead};
  }
`;

export const Arrow = styled.span`
  display: none;
  padding-bottom: 3px;
  font-size: 18px;
  color: ${({ active, sortDir, theme }) =>
    active && sortDir !== "none" ? theme.text.thead : "transparent"};
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
  transform: ${({ active, sortDir }) =>
    active && sortDir === "descending" ? "rotate(-180deg)" : "rotate(0)"};

  ${Common.mediaQuery.tabletS} {
    display: block;
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

export const SkeletonTd = styled.td`
  height: 40px;
  padding: 0 8px;
  vertical-align: middle;
  font-size: ${Common.fontSize.b[2]};
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

export const Active = styled(Icon)`
  font-size: ${Common.fontSize.h[1]};
  color: ${({ theme }) => theme.text.tbody};
  cursor: pointer;
`;
