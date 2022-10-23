import styled from "@emotion/styled";
import Common from "../../styles/common";

export const Section = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 24px;
  padding-bottom: 80px;
`;

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

export const ButtonWrapper = styled.div`
  align-self: center;
  padding-top: 14px;
`;
