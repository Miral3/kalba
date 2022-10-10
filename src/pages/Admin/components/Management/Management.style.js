import styled from "@emotion/styled";
import Common from "../../../../styles/common";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  ${Common.mediaQuery.tabletS} {
    width: 540px;
  }

  ${Common.mediaQuery.tablet} {
    width: 720px;
  }
`;
