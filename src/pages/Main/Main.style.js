import styled from "@emotion/styled";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
`;

export const Section = styled.section`
  padding-top: 24px;
  padding-bottom: 80px;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 476px));
  justify-content: center;
  gap: 24px;
`;
