import React from 'react';

import OWMicons from './Settings/OWMicons';
import UnitType from './Settings/UnitType';
import DefaultWeather from './Settings/DefaultWeather';
import { deleteUser, logout } from '../../../Functions/auth';
import { useDataLayerValue } from '../../../Context/DataLayer';

import '../../../Styles/Sidebar.css';


const closeSidebar = () => {
  document.querySelector('.sidebar__drawer').style.transform = 'translateX(-280px)';
  document.querySelector('.sidebar__backdrop').style.visibility = 'hidden';
  document.querySelector('.sidebar__backdrop').style.opacity = 0;
}

const handleLogout = (dispatch) => {
  logout().then(res => {
    if (!res.success) return window.alert(res);
    dispatch({ type: 'SET_USER', user: {} });
    localStorage.removeItem('isSignedIn');
  });
}

const deleteAccount = (dispatch) => {
  if (window.confirm('Are you sure to delete your account?')) {
    deleteUser().then(res => {
      if (!res.success) return window.alert(res);
      dispatch({ type: 'SET_USER', user: {} });
      localStorage.removeItem('isSignedIn');
    });
  }
}


export default function Sidebar() {
  const [{user}, dispatch] = useDataLayerValue();

  return (
    <div className="sidebar">
      <div className="sidebar__drawer">

        <div className="sidebar__header">
          <h2>{user.username ? `Hi, ${user.username}!` : 'Settings'}</h2>
          <span onClick={closeSidebar} className="material-icons-round sidebar__drawer__close">close</span>
        </div>

        <br/><hr className="hr" style={{margin: '0 16px'}}/><br/>

        <div className="sidebar__content">
          <DefaultWeather/>
          <br/><OWMicons/>
          <br/><UnitType/>

          <br/>

          <br/><button className="button" style={{width: '100%', backgroundColor: '#f22c', color: '#eee'}} onClick={() => handleLogout(dispatch)}>
            LOG OUT
          </button><br/><br/>
          <button className="remove" style={{margin: '0 auto', display: 'block', padding: '8px'}} onClick={() => deleteAccount(dispatch)}>
            Delete account
          </button>
        </div>

      </div>
      <div className="sidebar__backdrop" onClick={closeSidebar}></div>
    </div>
  );
}