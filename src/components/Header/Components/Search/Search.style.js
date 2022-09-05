import styled from "@emotion/styled";
import Common from "../../../../styles/common";

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
