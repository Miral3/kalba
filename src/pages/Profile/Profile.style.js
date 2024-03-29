import styled from "@emotion/styled";
import { Text } from "../../components";
import Common from "../../styles/common";

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

export const StyledText = styled(Text)`
  font-size: ${Common.fontSize.c[0]};
  font-weight: 600;
  line-height: 13px;

  ${Common.mediaQuery.mobile} {
    font-size: ${Common.fontSize.b[0]};
    line-height: 21px;
  }
`;
