import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

import CityCard from './CityCard';
import { useDataLayerValue } from '../../../Context/DataLayer';

import '../../../Styles/Home.css';


export default function Home() {
  const [{settings, ipLocation, user}, dispatch] = useDataLayerValue();

  const searchCities = (search) => dispatch({ type: 'SET_SEARCH', search });

  useEffect(() => { dispatch({ type: 'SET_SEARCH', search: '' }) }, [dispatch]);

  
  return (
    <div className="home__body">
      <div className="home">

        <span className="home__search">
          <input placeholder="Search in your favorites..." onChange={(e) => searchCities(e.target.value)}/>
        </span>

        {(ipLocation && settings.defaultWeather) && <CityCard city={ipLocation.city + ',' + ipLocation.country} description="Based on your current location"/>}
        
        {user && user.favorites?.map((city, i) => <CityCard key={i} city={city} description="From favorites" remove="Remove"/>)}

        <div className="citycard__body">
          <Link className="citycard__link" to={'/add'}>
            <div className="citycard citycard__add">
              <span className="material-icons-round" style={{fontSize: '48px'}}>add</span>&nbsp;<h1>ADD CITY</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}