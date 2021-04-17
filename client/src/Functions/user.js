import axios from 'axios';

import { apiUrl, cookieConfig } from '../config';


export const addFavorite = async (city) => {
  try {
    const {data} = await axios.put(apiUrl + 'user/addfavorite/' + city.name + ',' + city.sys.country, null, cookieConfig);
    
    return data.success ? data : data?.error;
    
  } catch (error) { return error.response?.data.error || 'Unknown error.'; }
};


export const removeFavorite = async (weather) => {
  try {
    const {data} = await axios.put(apiUrl + 'user/removefavorite/' + weather.name + ',' + weather.sys.country, null, cookieConfig);
    
    return data.success ? data : data?.error;
    
  } catch (error) { return error.response?.data.error || 'Unknown error.'; }
};