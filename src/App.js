import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import './app.css'

import RouteWithLayout from './layouts/RouteWithLayout'
import MainLayout from './layouts/Main';
import { ThemeProvider } from './context/themeProvider';

import Home from './routes/Home';
import LeaderBoards from './routes/LeaderBoards';
import StandardTable from './routes/StandardTable';
import Quiz from './routes/Quiz';
import Profile from './routes/Profile';
import NotFoundPage from './routes/NotFoundPage';
import About from './routes/About';
import Auth from './routes/Auth';

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
            path="/quiz"
            layout={MainLayout}
            component={Quiz}
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
            path="/auth"
            layout={MainLayout}
            component={Auth}
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