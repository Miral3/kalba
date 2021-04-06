import React from 'react';
import UserList from '../../UserList';
import styled from 'styled-components';

const MainPage = styled.div`
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

const Home = () => {
  return (
    <MainPage>
      <UserList type="지원 TOP 10" />
      <UserList type="공격력 TOP 10" />
    </MainPage>
  );
};

export default Home;