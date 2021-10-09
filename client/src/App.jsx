import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Chat from './components/Chat';
import Join from './components/Join';
const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/chat" component={Chat} />
        <Route exact path="/" component={Join} />
      </Switch>
    </HashRouter>
  );
};

export default App;
