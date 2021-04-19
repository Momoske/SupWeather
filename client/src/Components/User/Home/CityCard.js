import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { weatherIcons } from '../../../config';
import { getWeather } from '../../../Functions/weather';
import { removeFavorite } from '../../../Functions/user';
import { useDataLayerValue } from '../../../Context/DataLayer';

import '../../../Styles/CityCard.css';

  
const handleRemove = (weather, dispatch) => {
  if (window.confirm('Delete ' + weather.name + ' from your favorites?')) {
    removeFavorite(weather).then(res => {
      if (!res.success) return window.alert(res);
      dispatch({type: 'SET_USER', user: res.user}); // Refresh content without reloading
    });
  }
}

// Easily switch between °C and °F
const calcTemp = (settings, temp) => { return  ~~(temp * (settings.metric ? 1 : 9/5) + (settings.metric ? 0 : 32)); }


export default function CityCard({city, description = '', remove = null, newTab = false}) {
  const [weather, setWeather] = useState(null);
  const [{search, settings}, dispatch] = useDataLayerValue();

  useEffect(() => {
    getWeather(city).then(res => setWeather(res));
  }, [city, setWeather]);

  return (
    weather && city.toLowerCase().includes(search?.toLowerCase() || '') && <div className="citycard__body">
      <Link target={newTab ? '_blank' : ''} rel='noreferrer' className="citycard__link" to={'/details/' + city}>
        <div className="citycard">
          <div className="citycard__content">
            <h3>{weather.name} ({weather.sys.country})</h3>
            <h1>{calcTemp(settings, weather.main.temp)}°{settings.metric ? 'C' : 'F'}</h1>
            <p className="citycard__status"><span>{weather.weather[0].description}</span></p>

            <p><span>Feels like: </span><span style={{fontWeight: '500'}}>{calcTemp(settings, weather.main.feels_like)}°{settings.metric ? 'C' : 'F'}</span></p>
            <p>
              <span>Min: </span><span style={{color: '#39e', fontWeight: '500'}}>{calcTemp(settings, weather.main.temp_min)}°{settings.metric ? 'C' : 'F'}</span>
              <span> / Max: </span><span style={{color: '#f63', fontWeight: '500'}}>{calcTemp(settings, weather.main.temp_max)}°{settings.metric ? 'C' : 'F'}</span>
            </p>
          </div>
          <div className="citycard__img">
            <img src={!settings.owmIcons ?
              `/images/${weatherIcons[weather.weather[0].icon]}` :
              `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather"/>
            <h3>{weather.weather[0].main}</h3>
          </div>
        </div>
      </Link>
      <div className="citycard__desc">
        <p>{description}</p>
        {remove && <button className="remove" onClick={() => handleRemove(weather, dispatch)}>{remove}</button>}
      </div>
    </div>
  );
}