import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { getIpLocation } from '../Functions/utils';
import LoggedInRoutes from '../Routes/LoggedInRoutes';
import LoggedOutRoutes from '../Routes/LoggedOutRoutes';
import { logout, setUserInfo } from '../Functions/auth';
import { useDataLayerValue } from '../Context/DataLayer';

import '../Styles/App.css';


export default function App() {
  const [{user}, dispatch] = useDataLayerValue();

  useEffect(() => { /* AVOID VISUAL GLITCHES ON WINDOW RESIZE */
    (function() {
      let timer = 0;
      const body = document.body.classList;
      window.addEventListener('resize', function () {
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
    })();
  }, []);

  useEffect(() => {
    getIpLocation().then(res => dispatch({type: 'SET_IP_LOCATION', ipLocation: res.location}));

    const signedIn = localStorage.getItem('isSignedIn');
    if (!signedIn) return dispatch({type: 'SET_USER', user: {}});

    setUserInfo().then(res => {
      if (!res.success) { window.alert(res); logout(); }
      dispatch({type: 'SET_USER', user: res.success ? res.user : {}});
    });
  }, [dispatch]);
  

  return (
    <div className={localStorage.getItem('theme')
      ?
    (localStorage.getItem('theme') === 'dark' ? 'app dark' : 'app')
      :
    (window.matchMedia('(prefers-color-scheme: dark)')?.matches ? 'app dark' : 'app')}>
      {user === null ? <></> :
      <Router>
        {user._id ? <LoggedInRoutes/> : <LoggedOutRoutes/>}
      </Router>}
    </div>
  );
}