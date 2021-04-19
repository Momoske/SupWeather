import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { getIpLocation } from '../Functions/utils';
import LoggedInRoutes from '../Routes/LoggedInRoutes';
import LoggedOutRoutes from '../Routes/LoggedOutRoutes';
import { logout, getUserInfo } from '../Functions/auth';
import { useDataLayerValue } from '../Context/DataLayer';

import '../Styles/App.css';


export default function App() {
  const [{user, theme}, dispatch] = useDataLayerValue();

  useEffect(() => { // REMOVE TRANSITIONS ON WINDOW RESIZE
    let timer = 0;
    const body = document.body.classList;
    window.addEventListener('resize', () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      else body.add('stop-transitions');

      timer = setTimeout(() => {
        body.remove('stop-transitions');
        timer = null;
      }, 100);
    });
  }, []);

  useEffect(() => {
    // Retrieve the user's nearest main city to display a default weather location on first login
    getIpLocation().then(res => dispatch({ type: 'SET_IP_LOCATION', ipLocation: res.location }));

    const signedIn = localStorage.getItem('isSignedIn');
    if (!signedIn) return dispatch({ type: 'SET_USER', user: {} });

    getUserInfo().then(res => {
      if (!res.success) { window.alert(res); logout(); }
      dispatch({ type: 'SET_USER', user: res.user ?? {} });
    });
  }, [dispatch]);
  

  return (
    <div className={theme === 'dark' ? 'app dark' : 'app'}>
      {user && <Router>
        {user._id ? <LoggedInRoutes/> : <LoggedOutRoutes/>}
      </Router>}
    </div>
  );
}