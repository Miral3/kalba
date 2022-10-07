import styled from "@emotion/styled";
import { Text } from "..";
import Common from "../../styles/common";

export const ErrorText = styled(Text)`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${Common.colors.red[0]};
  font-weight: 500;
`;
