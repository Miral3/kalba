import styled from "@emotion/styled";
import Common from "../../../../styles/common";

export const Container = styled.div``;

export const Caption = styled.caption`
  background-color: ${({ theme }) => theme.bg.caption};
  color: ${Common.colors.white[0]};
`;

export const CaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 32px;
  padding-top: 8px;
  font-size: ${Common.fontSize.b[1]};
  font-weight: bold;
  color: ${Common.colors.white[0]};
`;
