import axios from 'axios';

import { apiKey } from '../config';


export const getWeather = async (city) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const weather = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather?q='
      + city + '&appid=' + apiKey + '&units=metric', config
    );
    if (weather.status === 200) return weather.data;

  } catch (error) {
    window.alert((!city.includes(',') ? city :
      city.substring(0, city.indexOf(',')) + ' (' + city.substring(city.indexOf(',') + 1, city.length) + ')')
    + ' could not be found.');
  }
};


export const getWeatherDetails = async (city) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const weather = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast?q='
      + city + '&appid=' + apiKey + '&units=metric', config
    );
    if (weather.status === 200) return weather.data;

  } catch (error) {
    window.alert('Could not get weather for ' + (!city.includes(',') ? city :
      city.substring(0, city.indexOf(',')) + ' (' + city.substring(city.indexOf(',') + 1, city.length) + ')')
    + '.');
  }
};