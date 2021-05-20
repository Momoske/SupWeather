import React from 'react';

import OWMicons from './Settings/OWMicons';
import UnitType from './Settings/UnitType';
import DefaultWeather from './Settings/DefaultWeather';
import { deleteUser, logout } from '../../../Functions/auth';
import { useDataLayerValue } from '../../../Context/DataLayer';

import '../../../Styles/Sidebar.css';


const closeSidebar = () => {
  document.querySelectorAll('.sidebar > div').forEach(element => element.classList.toggle('active'));
}

const handleLogout = (dispatch) => {
  logout().then(res => {
    if (!res.success) return window.alert(res);
    dispatch({ type: 'SET_USER', user: {} });
    localStorage.removeItem('isSignedIn');
  });
}

const deleteAccount = (dispatch, user) => {
  const input = window.prompt('Please type-in your email address to delete your account.');
  if (input === user.email) {
    return deleteUser().then(res => {
      if (!res.success) return window.alert(res);
      dispatch({ type: 'SET_USER', user: {} });
      localStorage.removeItem('isSignedIn');
    });
  }
  if (input) window.alert('The email address you typed is incorrect, please try again.');
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

          <br/><button className="button button-logout" onClick={() => handleLogout(dispatch)}>LOG OUT</button>
          <br/><br/>
          <button className="remove button-delete" onClick={() => deleteAccount(dispatch, user)}>Delete account</button>
        </div>

      </div>
      <div className="sidebar__backdrop" onClick={closeSidebar}/>
    </div>
  );
}