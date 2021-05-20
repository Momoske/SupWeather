import axios from 'axios';

import { apiUrl, config, cookieConfig } from '../config';


export const login = async (user) => {
  if (!user.login || !user.password)
    return window.alert('Please fill-in both email and password.');

  try {
    const {data} = await axios.post(apiUrl + 'auth/login', user, cookieConfig);

    return data.success ? data : data?.error;

  } catch (error) { return error.response?.data.error || 'Unknown error.'; }
};


export const logout = async () => {
  try {
    const {data} = await axios.get(apiUrl + 'auth/logout', cookieConfig);

    return data.success ? data : data?.error;

  } catch (error) { return error.response?.data.error || 'Unknown error.'; }
};


export const register = async (user) => {
  try {
    const {data} = await axios.post(apiUrl + 'auth/register', user, cookieConfig);

    return data.success ? data : data?.error;
    
  } catch (error) { return error.response?.data.error || 'Unknown error.'; }
};


export const forgotPw = async (forgot) => {
  try {
    const {data} = await axios.post(apiUrl + 'auth/forgot', {forgot}, config);

    return data.success ? data : data?.error;
    
  } catch (error) { return error.response?.data.error || 'Unkonwn error.'; }
};


export const resetPw = async ({token, password, passCheck}) => {
  try {
    const {data} = await axios.put(apiUrl + 'auth/reset/' + token.replace(' ', ''), {password, passCheck}, config);

    return data.success ? data : data?.error;
    
  } catch (error) { return error.response?.data.error || 'Unkonwn error.'; }
};


export const deleteUser = async () => {
  try {
    const {data} = await axios.delete(apiUrl + 'auth/delete', cookieConfig);

    return data.success ? data : data?.error;
    
  } catch (error) { return error.response?.data.error || 'Unkonwn error.'; }
}


export const getUserInfo = async () => {
  try {
    const {data} = await axios.get(apiUrl + 'auth/userinfo', cookieConfig);

    return data.success ? data : data?.error;

  } catch (error) {
    localStorage.removeItem('isSignedIn');
    return 'Your session has expired, please sign in again.';
  }
};