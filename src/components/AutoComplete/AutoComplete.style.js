import styled from "@emotion/styled";
import Common from "../../styles/common";

export const Container = styled.nav`
  position: absolute;
  z-index: 3;
  display: ${({ visible }) => (visible ? "block" : "none")};
  width: 100%;
  margin-top: 5px;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 30%) 0px 8px 12px 0px;
  background-color: ${Common.colors.white[0]};

  ${Common.mediaQuery.tablet} {
    margin: 0;
    margin-top: 8px;
  }
`;

export const List = styled.ul`
  max-height: 160px;
  overflow: auto;
  overscroll-behavior: contain;
`;

export const Item = styled.li`
  margin: 5px;
  padding: 5px 7px;
  background-color: ${({ active }) =>
    active ? Common.colors.gray[1] : Common.colors.white[0]};
  font-size: ${Common.fontSize.c[1]};
  cursor: pointer;

  &:hover {
    background-color: ${Common.colors.gray[1]};
  }
`;

export const Name = styled.strong`
  color: ${Common.colors.black[0]};
  font-weight: 600;
`;

export const Tag = styled.small`
  color: ${Common.colors.gray[2]};
`;
