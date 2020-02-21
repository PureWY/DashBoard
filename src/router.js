import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Users from './routes/Users';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/Users" exact component={Users} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
