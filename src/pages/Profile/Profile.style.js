import styled from "@emotion/styled";
import Common from "../../styles/common";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

export const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 24px;
  padding-bottom: 80px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  & > div {
    box-sizing: border-box;
  }

  ${Common.mediaQuery.tabletS} {
    width: 540px;
  }
  ${Common.mediaQuery.tablet} {
    width: 680px;
  }
`;
