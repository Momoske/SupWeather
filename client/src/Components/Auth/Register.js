import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { register } from '../../Functions/auth';
import { useDataLayerValue } from '../../Context/DataLayer';

import '../../Styles/Auth.css';


const registerUser = (e, user, dispatch) => {
  e.preventDefault();
  
  register(user).then(res => {
    if (!res.success) window.alert(res);
    else localStorage.setItem('isSignedIn', res.success);

    // Routes stack will change once user context changes
    dispatch({type: 'SET_USER', user: res.success ? res.user : {}});
  });
}


export default function Register() {
  const history = useHistory();

  const [,dispatch] = useDataLayerValue();
  const [userRegister, setUserRegister] = useState({
    email: '',
    username: '',
    password: '',
    passCheck: '',
  });


  return (
    <div className="auth">
      <form className="auth__form" onSubmit={e => registerUser(e, userRegister, dispatch)}>
        <div className="auth__content">
          <span>
            <label htmlFor="username">Username</label>
            <input placeholder="John_20" id="username" onChange={e => setUserRegister({...userRegister, username: e.target.value})}/>
          </span>
          <span>
            <label htmlFor="email">Email address</label>
            <input placeholder="email@address.com" id="email" onChange={e => setUserRegister({...userRegister, email: e.target.value})}/>
          </span>
          <span>
            <label htmlFor="password">Password</label>
            <input placeholder="••••" id="password" type="password" onChange={e => setUserRegister({...userRegister, password: e.target.value})}/>
          </span>
          <span>
            <label htmlFor="confirm">Confirm password</label>
            <input placeholder="••••" id="confirm" type="password" onChange={e => setUserRegister({...userRegister, passCheck: e.target.value})}/>
          </span>
        </div>

        <span>
          <button className="button submit" type="submit">Register</button>
        </span>
      </form>
      
      <button className="button" onClick={() => history.push('/login')}>Already registered? Login</button>
    </div>
  );
}