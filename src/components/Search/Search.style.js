import styled from "@emotion/styled";
import Common from "../../styles/common";
import Button from "../Button";

export const Container = styled.div`
  position: relative;
  width: calc(100% - 50px);
  margin: auto;
  ${Common.mediaQuery.tablet} {
    width: 260px;
    margin: 0;
  }
`;
export const Search = styled.div`
  display: flex;
  height: 32px;
`;

export const SearchInner = styled.div`
  flex-grow: 1;
  position: relative;
`;

export const StyledButton = styled(Button)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 8px;
  cursor: pointer;
`;