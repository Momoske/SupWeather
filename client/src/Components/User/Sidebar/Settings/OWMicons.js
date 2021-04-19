import React from 'react';
import Switch from 'react-switch';

import { useDataLayerValue } from '../../../../Context/DataLayer';


export default function OWMicons() {
  const [{settings}, dispatch] = useDataLayerValue();

  const toggleOwmIcons = () => {
    dispatch({ type: 'SET_SETTINGS', settings: {...settings, owmIcons: !settings.owmIcons} });
    localStorage.setItem('owmIcons', localStorage.getItem('owmIcons') !== 'off' ? 'off' : 'on');
  }


  return (
    <label className="toggle">
      <span>OpenWeatherMap icons</span>
      <Switch checked={settings.owmIcons} onChange={toggleOwmIcons}
        offHandleColor="#888" onHandleColor="#080"
        checkedHandleIcon={
          <svg viewBox="0 0 10 10" height="100%" width="100%" fill="#fff">
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
  );
}