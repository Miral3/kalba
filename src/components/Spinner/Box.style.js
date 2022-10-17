import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.bg.tbody};
`;
