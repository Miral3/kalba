import React, { useState, useCallback } from 'react';
import Categories from '../Categories';
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

const LeaderBoards = () => {
  const [category, setCategory] = useState('score');
  const onSelect = useCallback(category => setCategory(category), []);
  return (
    <div>
      <Categories category={category} onSelect={onSelect} type={rankCategories} />
      <UserList category={category} />
    </div>
  );
};

export default LeaderBoards;