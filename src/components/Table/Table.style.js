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
  background-color: ${Common.colors.basic[0]};
  color: ${Common.colors.brown[0]};
`;

export const Tbody = styled.tbody`
  background-color: ${Common.colors.white[0]};

  tr:hover {
    background-color: ${({ version }) =>
      version === "leaderboard"
        ? Common.colors.gray[1]
        : Common.colors.white[0]};
  }
`;

export const Tr = styled.tr`
  border: 1px solid ${Common.colors.gray[3]};
`;

export const Th = styled.th`
  height: 40px;
  vertical-align: middle;
  font-size: ${Common.fontSize.b[2]};

  &:nth-of-type(1) {
    width: ${({ version }) => (version === "leaderboard" ? "auto" : "40%")};
    padding-left: 12px;
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
      version === "leaderboard" ? "20px" : "12px"};
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
`;
