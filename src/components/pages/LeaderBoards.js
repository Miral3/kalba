import React from 'react';
import Categories from '../Categories/LeaderBoardCategory';
import UserList from '../UserList';

const rankCategories = [
  {
    name: 'score',
    text: '공격력'
  },
  {
    name: 'donations',
    text: '지원율'
  }
];

const LeaderBoards = ({ match }) => {
  const category = match.params.category || 'score';

  return (
    <div>
      <Categories type={rankCategories} />
      <UserList category={category} />
    </div>
  );
};

export default LeaderBoards;