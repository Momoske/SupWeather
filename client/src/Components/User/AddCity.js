import React, { useState } from 'react';
import { useHistory } from 'react-router';
import BeatLoader from 'react-spinners/BeatLoader';

import CityCard from './Home/CityCard';
import { addFavorite } from '../../Functions/user';
import { getWeather } from '../../Functions/weather';
import { useDataLayerValue } from '../../Context/DataLayer';

import '../../Styles/AddCity.css';


const handleAdd = (found, history, dispatch) => {
  addFavorite(found).then(res => {
    if (!res.success) return window.alert(res);
    dispatch({ type: 'SET_USER', user: res.user }); history.push('/'); // Refresh content without reloading
  });
}


export default function AddCity() {
  const history = useHistory();
  const [{theme}, dispatch] = useDataLayerValue();

  const [found, setFound] = useState(null);
  const [search, setSearch] = useState(null);
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchCity = (e) => {
    e.preventDefault();
    setLoading(true);
    setFound(null);
    
    getWeather(search + (country ? (',' + country) : '')).then(res => {
      setLoading(false);
      res && setFound(res);
    });
  };


  return (
    <div className="addcity">
      <form onSubmit={e => searchCity(e)}>
        <span className="addcity__search">
          <span>
            <label htmlFor="city">City name</label>
            <input placeholder="Type in a city" id="city" onChange={(e) => setSearch(e.target.value)}/>
          </span>
          <span>
            <label htmlFor="code">Country code</label>
            <input placeholder="(optional)" id="code" maxLength={2} onChange={(e) => setCountry(e.target.value)}/>
          </span>
          <button type="submit" className="material-icons-round" style={{fontSize: 28}}>search</button>
        </span>
      </form>

      {loading && <>
        <br/><hr className="hr" style={{width: '33%'}}/><br/>
        <div className="loader" style={{height: '200px'}}>
          <BeatLoader color={theme === 'dark' ? '#84faa4' : '#243cf8'} loading/>
        </div>
      </>}

      {found && <>
        <br/><hr className="hr" style={{width: '33%'}}/><br/>
        <CityCard city={found.name + ',' + found.sys.country} newTab={true}/><br/>
        <button style={{visibility: loading ? 'hidden' : 'visible'}} className="button" onClick={() => handleAdd(found, history, dispatch)}>Add {found.name}</button>
      </>}
    </div>
  );
}