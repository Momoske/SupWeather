import React from 'react';
import Switch from 'react-switch';

import { useDataLayerValue } from '../../../../Context/DataLayer';

export default function DefaultWeather() {
  const [{settings}, dispatch] = useDataLayerValue();

  const toggleDefaultWeather = () => {
    dispatch({
      type: 'SET_SETTINGS',
      settings: {...settings, defaultWeather: !settings.defaultWeather}
    });
    localStorage.setItem('defaultWeather', localStorage.getItem('defaultWeather') !== 'off' ? 'off' : 'on');
  }


  return (
    <label className="toggle">
      <span>Default weather card</span>
      <Switch checked={settings.defaultWeather} onChange={toggleDefaultWeather}
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