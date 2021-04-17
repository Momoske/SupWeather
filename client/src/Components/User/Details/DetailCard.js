import React from 'react';

import { weatherIcons } from '../../../config';
import { useDataLayerValue } from '../../../Context/DataLayer';


const days = {
  'Mon': 'Monday',
  'Tue': 'Tuesday',
  'Wed': 'Wednesday',
  'Thu': 'Thursday',
  'Fri': 'Friday',
  'Sat': 'Saturday',
  'Sun': 'Sunday'
}
const months = {
  'Jan': 'January',
  'Feb': 'February',
  'Mar': 'March',
  'Apr': 'April',
  'May': 'May',
  'Jun': 'June',
  'Jul': 'July',
  'Aug': 'August',
  'Sep': 'September',
  'Oct': 'October',
  'Nov': 'November',
  'Dec': 'December'
}

const formatDate = (date) => {
  let time = new Date(date*1000).toTimeString().slice(0, 8);
  date = new Date(date*1000).toDateString().slice(0, -4);
  return `${days[date.substring(0, 3)]}, ${months[date.substring(4, 7)]} ${date.substring(8, 10)} - ${time}`;
}


export default function DetailCard({data, weather}) {
  const [{settings},] = useDataLayerValue();

  const calcTemp = (temp) => { return  ~~(temp * (settings.metric ? 1 : 9/5) + (settings.metric ? 0 : 32)); }

  return (
    <div className="citycard__body">

      <div className="citycard__detail__date">
        <p>{formatDate(data.dt)}</p>
      </div>

      <div className="citycard__detail">
        <div className="citycard__img">
          <img src={!settings.owmIcons ?
            `/images/${weatherIcons[data.weather[0].icon]}` :
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="weather"/>
        </div>

        <div className="citycard__content">
          <div className="content__row">
            <span style={{fontSize: '40px', fontWeight: '700'}}>{calcTemp(data.main.temp)}°{settings.metric ? 'C' : 'F'}</span>
            <div style={{textAlign: 'end'}}>
              <h4 style={{textTransform: 'capitalize', margin: 0}}>{data.weather[0].description}</h4>
              <p style={{margin: '2px 0'}}><span>Feels like: </span>
                <span style={{fontWeight: 'bold'}}>{calcTemp(data.main.feels_like)}°{settings.metric ? 'C' : 'F'}</span>
              </p>
            </div>
          </div><br/>
          <div className="content__row">
            <p><span>Min: </span><span style={{fontWeight: 'bold', color: '#39e'}}>{calcTemp(data.main.temp_min)}°{settings.metric ? 'C' : 'F'}</span></p>
            <p><span>Max: </span><span style={{fontWeight: 'bold', color: '#f63'}}>{calcTemp(data.main.temp_max)}°{settings.metric ? 'C' : 'F'}</span></p>
          </div>
          <div className="content__row">
            <p><span>Sunrise: </span><span style={{fontWeight: 'bold'}}>{new Date(weather.city.sunrise*1000).toTimeString().slice(0, 8)}</span></p>
            <p><span>Sunset: </span><span style={{fontWeight: 'bold'}}>{new Date(weather.city.sunset*1000).toTimeString().slice(0, 8)}</span></p>
          </div>
          <div className="content__row">
            <p><span>Humidity: </span><span style={{fontWeight: 'bold'}}>{data.main.humidity}%</span></p>
            <p><span>Pressure: </span><span style={{fontWeight: 'bold'}}>{data.main.pressure} hPA</span></p>
          </div>
          <div className="content__row">
            <p><span>Wind: </span><span style={{fontWeight: 'bold'}}>{data.main.humidity}%</span></p>
            <p><span>Orientation: </span><span style={{fontWeight: 'bold'}}>{data.main.pressure} hPA</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
