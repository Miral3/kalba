import React, { useState, useCallback } from 'react';
import Categories from '../Categories';
import UserList from '../UserList';

const LeaderBoards = () => {
  const [category, setCategory] = useState('score');
  const onSelect = useCallback(category => setCategory(category), []);

  return (
    <div>
      <Categories category={category} onSelect={onSelect} />
      <UserList category={category} />
    </div>
  );
};

export default LeaderBoards;