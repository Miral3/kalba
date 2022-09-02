import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import Common from "../../styles/common";

export const Table = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  position: sticky;
  top: 0;
  background-color: ${Common.colors.basic[0]};
  color: ${Common.colors.brown[0]};
`;

export const Tbody = styled.tbody`
  background-color: ${Common.colors.white[0]};
`;

export const Tr = styled.tr`
  border: 1px solid ${Common.colors.gray[3]};
`;

export const Th = styled.th`
  height: 32px;
  vertical-align: middle;
  font-size: ${Common.fontSize.b[2]};

  &:nth-of-type(1) {
    width: ${({ version }) => (version === "standard" ? "40%" : "auto")};
    padding-left: 12px;
  }
  &:nth-of-type(3),
  &:nth-of-type(4),
  &:nth-of-type(5) {
    width: ${({ version }) => (version === "leaderboard" ? "15%" : "auto")};
  }
`;

export const Td = styled.td`
  height: 32px;
  vertical-align: middle;
  font-size: ${Common.fontSize.b[2]};

  &:first-of-type {
    padding-left: 12px;
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
