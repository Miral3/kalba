import styled from "@emotion/styled";
import Common from "../../../../styles/common";
import { Button } from "../../../../components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

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

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

export const StyledButton = styled(Button)`
  border: 1px solid ${Common.colors.gray[9]};
  padding: 5px 10px;
  ${({ dir }) => dir === "left" && "margin-right: auto"};
  background-color: ${Common.colors.white[0]};
  color: ${Common.colors.black[4]};
  font-weight: 600;
  font-size: ${Common.fontSize.b[2]};

  &:hover {
    background-color: ${Common.colors.gray[1]};
  }
`;
