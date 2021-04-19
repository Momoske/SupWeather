import Switch from 'react-switch';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDataLayerValue } from '../../Context/DataLayer';

import '../../Styles/Header.css';


const openSidebar = () => {
  document.querySelector('.sidebar__drawer').style.transform = 'translateX(0)';
  document.querySelector('.sidebar__backdrop').style.visibility = 'inherit';
  document.querySelector('.sidebar__backdrop').style.opacity = 0.5;
}

const toggleTheme = (dark, setDark, dispatch) => {
  setDark(!dark);
  localStorage.setItem('theme', dark ? 'light' : 'dark');
  document.querySelector('.app').classList.toggle('dark');
  dispatch({ type: 'SET_THEME', theme: dark ? 'light' : 'dark' });
}

// Use app context to communicate search between header & home city cards
const searchCities = (search, dispatch) => dispatch({ type: 'SET_SEARCH', search });


export default function Header() {
  const [{user, theme}, dispatch] = useDataLayerValue();
  const [dark, setDark] = useState(theme === 'dark' ? true : false);


  return (
    <div className="header">
      <div>
        {user?._id && <span className="material-icons-round hamburger" onClick={openSidebar}>menu</span>}
        <Link to='/' style={{color: 'inherit', textDecoration: 'none'}}>
          <div className="brand"><img src="/SupWeather.svg" alt="logo" className="logo"/><span>SupWeather</span></div>
        </Link>
      </div>

      {(user?._id && window.location.pathname === '/') && <div className="header__search">
        <input placeholder="Search in your favorites..." onChange={(e) => searchCities(e.target.value, dispatch)}/>
      </div>}

      <div className="theme__toggle" style={{justifyContent: 'flex-end'}}>
        <p style={{opacity: !dark ? '1' : '0.5'}}>Light</p>
        <label className="toggle">
          <Switch checked={dark} onChange={() => toggleTheme(dark, setDark, dispatch)} onColor='#6e40c9'
            offColor='#fd0' onHandleColor='#6e40c9' offHandleColor='#fd0'
            checkedIcon={
              <svg width="80%" height="80%" viewBox="0 0 128 128">
                <path d="M45.668,113.9a44.735,44.735,0,0,1-17.776-3.649A45.481,45.481,0,0,1,13.376,100.3a46.33,46.33,0,0,1-9.787-14.76,46.954,46.954,0,0,1,6.954-47.752A45.976,45.976,0,0,1,22.219,27.609,44.832,44.832,0,0,1,36.83,21.9a46.818,46.818,0,0,0-7.336,25.25c0,25.6,20.487,46.435,45.668,46.435A45.3,45.3,0,0,0,84,92.714a46.328,46.328,0,0,1-16.195,15.373A44.877,44.877,0,0,1,45.668,113.9Z" transform="translate(36 14)" fill="#ffd000"/>
              </svg>
            }
            uncheckedIcon={
              <svg viewBox="0 0 128 128" height="80%" width="80%" fill="#a4f" transform="translate(2.75 2.75)">
                <circle cx="24" cy="24" r="24" transform="translate(40 40)" fill="#a4f"/>
                <rect width="6" height="18" rx="3" transform="translate(61 96)" fill="#a4f"/>
                <rect width="6" height="18" rx="3" transform="translate(61 14)" fill="#a4f"/>
                <rect width="6" height="18" rx="3" transform="translate(14 67) rotate(-90)" fill="#a4f"/>
                <rect width="6" height="18" rx="3" transform="translate(96 67) rotate(-90)" fill="#a4f"/>
                <rect width="6" height="16" rx="3" transform="translate(28 32.243) rotate(-45)" fill="#a4f"/>
                <rect width="6" height="16" rx="3" transform="translate(39.314 84.5) rotate(45)" fill="#a4f"/>
                <rect width="6" height="16" rx="3" transform="translate(95.814 28) rotate(45)" fill="#a4f"/>
                <rect width="6" height="16" rx="3" transform="translate(84.5 88.742) rotate(-45)" fill="#a4f"/>
              </svg>
            }
            checkedHandleIcon={
              <svg viewBox="0 0 10 10" height="100%" width="100%" fill="#eebb00">
                <circle r={3.5} cx={5} cy={5} />
              </svg>
            }
            uncheckedHandleIcon={
              <svg viewBox="0 0 10 10" height="100%" width="100%" fill="#fff">
                <circle r={3.5} cx={5} cy={5} />
              </svg>
            }
          />
        </label>
        <p style={{opacity: dark ? '1' : '0.5'}}>Dark</p>
      </div>
    </div>
  );
}