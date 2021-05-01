import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import './app.css'

import RouteWithLayout from './layouts/RouteWithLayout'
import MainLayout from './layouts/Main';
import { ThemeProvider } from './context/themeProvider';

import Home from './routes/Home';
import LeaderBoards from './routes/LeaderBoards';
import StandardTable from './routes/StandardTable';
import Profile from './routes/Profile';
import NotFoundPage from './routes/NotFoundPage';
import About from './routes/About';

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <Switch>
          <Redirect
            exact
            from="/"
            to="/home"
          />
          <RouteWithLayout
            path="/home"
            layout={MainLayout}
            component={Home}
          />
          <RouteWithLayout
            path="/leaderBoards/:category?"
            layout={MainLayout}
            component={LeaderBoards}
          />
          <RouteWithLayout
            path="/standardTable/:category?"
            layout={MainLayout}
            component={StandardTable}
          />
          <RouteWithLayout
            path="/profile/:category?"
            layout={MainLayout}
            component={Profile}
          />
          <RouteWithLayout
            path="/about"
            layout={MainLayout}
            component={About}
          />
          <RouteWithLayout
            path="/not-found"
            layout={MainLayout}
            component={NotFoundPage}
          />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeProvider>
    </Router>
  );
};

export default App;