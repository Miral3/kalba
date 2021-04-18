/* React */
import React from 'react';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import UserList from '../../components/RankingList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0;
  margin: 0;  
  @media (min-width: 992px) {
    flex-direction: row;
  }
  @media (min-width: 768px) {
    max-width: 70%;
    padding-right: 16px;
    padding-left: 16px;
    margin-right: auto;
    margin-left: auto;
  }
  @media (min-width: 576px){
    max-width: 70%;
    padding-right: 16px;
    padding-left: 16px;
    margin-right: auto;
    margin-left: auto;
  }
`;

const Home = props => {

  return (
    <Container>
      <UserList title="지원 TOP 10" type="donations" />
      <UserList title="공격력 TOP 10" type="score" />
    </Container>
  );
}

export default Home;