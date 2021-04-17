import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import Header from '../Components/User/Header';
import Home from '../Components/User/Home/Home';
import AddCity from '../Components/User/AddCity';
import Sidebar from '../Components/User/Sidebar/Sidebar';
import CityDetails from '../Components/User/Details/CityDetails';

import '../Styles/Body.css';


export default function LoggedInRoutes() {
  return (
    <>
      <Sidebar/>
      <div className="body">
        <Switch>
          <Route exact path='/'>
            <Header/>
            <Home/>
          </Route>

          <Route path='/add'>
            <Header/>
            <AddCity/>
          </Route>

          <Route path='/details/:city'>
            <Header/>
            <CityDetails/>
          </Route>

          <Route render={() => <Redirect to='/'/>}/>
        </Switch>
      </div>
    </>
  );
}