/* React */
import React from 'react';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import Categories from '../../components/Categories/Category';
import UserList from '../../components/UserList';

const Container = styled.div`
  padding-top: 1.5rem;
`

const items = [
  { name: 'score', text: '공격력' },
  { name: 'donations', text: '지원량' }
];

const LeaderBoards = ({ match }) => {
  const category = match.params.category || 'score';

  return (
    <Container>
      <Categories items={items} type="leaderboards" any="score" />
      <UserList category={category} />
    </Container>
  );
}

export default LeaderBoards;