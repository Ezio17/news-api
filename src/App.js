import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';

import HomePage from './components/HomePage'
import Post from './components/Post'
import User from './components/User'

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/posts/:id" component={Post} />
          <Route exact path="/users/:id" component={User} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
