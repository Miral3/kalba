import styled from "@emotion/styled";
import Common from "../../../../styles/common";
import { Button } from "../../../../components";

export const Container = styled.div``;

export const Caption = styled.caption`
  background-color: ${Common.colors.brown[0]};
  color: ${Common.colors.white[0]};
`;

export const CaptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 32px;
  padding-top: 8px;
`;

export const StyledButton = styled(Button)`
  font-size: ${Common.fontSize.b[1]};
  color: ${Common.colors.white[0]};
  font-weight: bold;
`;
