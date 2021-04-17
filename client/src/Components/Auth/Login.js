import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { login } from '../../Functions/auth';
import { useDataLayerValue } from '../../Context/DataLayer';

import '../../Styles/Auth.css';


const loginUser = (e, user, dispatch) => {
  e.preventDefault();

  login(user).then(res => {
    if (!res.success) window.alert(res);
    else localStorage.setItem('isSignedIn', res.success);

    // Routes stack will change once user context changes
    dispatch({type: 'SET_USER', user: res?.success ? res.user : {}});
  });
}


export default function Login() {
  const history = useHistory();

  const [,dispatch] = useDataLayerValue();
  const [userLogin, setUserLogin] = useState({
    login: '',
    password: ''
  });


  return (
    <div className="auth">
      <form className="auth__form" onSubmit={e => loginUser(e, userLogin, dispatch)}>
        <div className="auth__content">
          <span>
            <label htmlFor="login">Email address or username</label>
            <input placeholder="email@address.com, John_20" id="login" onChange={e => setUserLogin({...userLogin, login: e.target.value})}/>
          </span>
          <span>
            <label htmlFor="password">Password</label>
            <input placeholder="••••" id="password" type="password" onChange={e => setUserLogin({...userLogin, password: e.target.value})}/>
            <Link to='/forgot' id="forgotLink">Forgot password?</Link>
          </span>
        </div>

        <span>
          <button className="button submit" type="submit">Sign in</button>
        </span>
      </form>
      
      <button className="button" onClick={() => history.push('/register')}>No account yet? Register</button>
    </div>
  );
}