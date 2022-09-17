import styled from "@emotion/styled";
import Common from "../../styles/common";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;

  ${Common.mediaQuery.tablet} {
    align-items: center;
  }
`;
