import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import Login from '../Components/Auth/Login';
import Header from '../Components/User/Header';
import Forgot from '../Components/Auth/Forgot';
import Register from '../Components/Auth/Register';


export default function LoggedOutRoutes() {
  return (
    <>
      <Header/>
      <Switch>
        <Route path='/login'>
          <Login/>
        </Route>
        
        <Route path='/forgot'>
          <Forgot/>
        </Route>
        
        <Route path='/register'>
          <Register/>
        </Route>

        {/* Redirect to the home page if the route doesn't exist */}
        <Route render={() => <Redirect to='/login'/>}/>
      </Switch>
    </>
  );
}