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
  border: ${({ theme }) => theme.border.tr};
  padding: 5px 10px;
  ${({ dir }) => dir === "left" && "margin-right: auto"};
  background-color: ${({ theme }) => theme.bg.tbody};
  color: ${({ theme }) => theme.text.tbody};
  font-weight: 600;
  font-size: ${Common.fontSize.b[2]};

  &:hover {
    background-color: ${({ theme }) => theme.hover.tbody};
  }
`;
