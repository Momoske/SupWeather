export const apiUrl = 'https://localhost:9000/api/v1/';
export const apiKey = process.env.REACT_APP_API_KEY;

export const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const cookieConfig = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  credentials: 'include'
}

export const weatherIcons = {
  '01d': 'sunny.png', '01n': 'sunny.png',
  '02d': 'cloudy.png', '02n': 'cloudy.png',
  '03d': 'cloudy.png', '03n': 'cloudy.png',
  '04d': 'cloudy.png', '04n': 'cloudy.png',
  '09d': 'raining.png', '09n': 'raining.png',
  '10d': 'raining.png', '10n': 'raining.png',
  '11d': 'storm.png', '11n': 'storm.png',
  '13d': 'snowing.png', '13n': 'snowing.png',
  '50d': 'cloudy.png', '50n': 'cloudy.png'
};