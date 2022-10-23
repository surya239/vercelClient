import React from 'react';
import Signup from './Pages/Signup'
import Login from './Pages/Login';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import { PrivateRoute } from './Auth/PrivateRoute';
import Dashboard from './Pages/Dashboard';
import Game from './Pages/Game';
import Reoport from './Pages/Report';
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact><Login /></Route>
          <Route path='/signup'> <Signup /> </Route>
          <Route path='/login'> <Login /> </Route>
          <PrivateRoute path='/dashboard/:email'><Dashboard /></PrivateRoute>
          <PrivateRoute path='/game/dashboard/:email/:id'><Game /></PrivateRoute>
          <PrivateRoute path='/play/dashboard/:email/:name/:id/' exact><Game /></PrivateRoute>
          <PrivateRoute path='/play/dashboard/:email/:id/:name/:state'><Game /></PrivateRoute>
          <PrivateRoute path='/report/dashboard/:email/:id'><Reoport ></Reoport></PrivateRoute>
        </Switch>
      </Router>
    </>
  );
}

export default App;
