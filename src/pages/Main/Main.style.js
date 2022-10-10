import styled from "@emotion/styled";

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  padding-bottom: 80px;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 540px));
  justify-content: center;
  gap: 24px;
`;
