import styled from "@emotion/styled";

export const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ size }) => size};
  font-weight: ${({ weight }) => weight};
  color: ${({ color }) => color};
`;
