import React from 'react'
import { Switch, Route, HashRouter } from "react-router-dom";
import Chat from "./components/Chat";
import Join from "./components/Join";
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

export default App
