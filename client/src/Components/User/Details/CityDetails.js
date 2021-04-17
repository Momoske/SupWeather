import { useParams } from 'react-router';
import Carousel from 'react-multi-carousel';
import React, { useState, useEffect } from 'react';

import DetailCard from './DetailCard';
import { getWeatherDetails } from '../../../Functions/weather';

import '../../../Styles/CityDetails.css';
import 'react-multi-carousel/lib/styles.css';


const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1500 },
    items: 4,
    partialVisibilityGutter: 40
  },
  laptop: {
    breakpoint: { max: 1500, min: 1000 },
    items: 3,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: { max: 1000, min: 500 },
    items: 2,
    partialVisibilityGutter: 20
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
    partialVisibilityGutter: 10
  }
};

export default function CityDetails() {
  const {city} = useParams();

  const [option, setOption] = useState('day');
  const [weather, setWeather] = useState({day: null, hour: null});

  useEffect(() => {
    getWeatherDetails(city).then(res => {
      setWeather(weather => ({...weather, hour: res}));

      let dailyTmp = [];
      res.list.map((data, i) => i%8 === 0 && dailyTmp.push(data));
      setWeather(weather => ({...weather, day: {...res, list: dailyTmp}}));
    });
  }, [city]);

  
  return (
    <div className="citydetails">
      {weather[option] && <>
        <div className="citydetails__body">
          <div id="title">
            <h1>{weather[option].city.name} ({weather[option].city.country})</h1>
            <h2>Next 5 days</h2>
          </div>
          <div className="citycard__options">
            <p style={{fontWeight: '500'}}>Show forecast every</p>
            <div>
              <button className={option === 'day' ? 'button' : 'button selected'} onClick={() => setOption('hour')}>3 hours</button>
              <button className={option === 'day' ? 'button selected' : 'button'} onClick={() => setOption('day')}>24 hours</button>
            </div>
          </div>
        </div>

        <Carousel ssr={false} partialVisible responsive={responsive}>
          {weather[option].list.map((data, i) => <DetailCard key={i} data={data} weather={weather[option]}/>)}
        </Carousel>
      </>}
    </div>
  );
}