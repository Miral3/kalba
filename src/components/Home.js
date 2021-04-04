import React from 'react';
import { Route } from 'react-router-dom';
import Header from './layouts/Header/Header';

const Home = () => {
  return (
    <div>
      <Route path="/" component={Header} />
    </div>
  );
};

export default Home;