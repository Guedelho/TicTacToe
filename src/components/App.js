import React from 'react';
import { Route, Switch } from 'react-router';

import Home from '../containers/home/Home'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);

export default App;