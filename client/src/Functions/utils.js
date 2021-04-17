import axios from 'axios';
import publicIp from 'public-ip';

import { apiUrl } from '../config';


export const getIpLocation = async () => {
  const ip = await publicIp.v4();
    
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  
  try {
    const {data} = await axios.get(apiUrl + 'location/ip/' + ip, config);

    return data.success ? data : data?.error;

  } catch (error) {
    window.alert('Could not get a default weather location.');
    return {status: 500, location: ''};
  }
};