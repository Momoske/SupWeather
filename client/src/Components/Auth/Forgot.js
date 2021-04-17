import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { forgotPw, resetPw } from '../../Functions/auth';


const handleForgot = (e, forgot, setEmailSent) => {
  e.preventDefault();

  forgotPw(forgot).then(res => {
    if (!res.success)
      return window.alert(res);

    setEmailSent(true);
  });
}

const handleReset = (e, reset, history) => {
  e.preventDefault();

  resetPw(reset).then(res => {
    if (!res.success)
      return window.alert(res);

    window.alert(res.data);
    history.push('/login');
  });
}


export default function Forgot() {
  const history = useHistory();
  const [emailSent, setEmailSent] = useState(false);

  const [forgot, setForgot] = useState(null);
  const [reset, setReset] = useState({
    token: null,
    password: null,
    passCheck: null
  });


  return (
    <div className="auth">
      {!emailSent
        ?
      <form className="auth__form" onSubmit={e => handleForgot(e, forgot, setEmailSent)}>
        <h2 className="auth__title">Please type in your username or email address to reset your password.</h2><br/>
        <div className="auth__content">
          <span>
            <label htmlFor="forgot">Email address or username</label>
            <input placeholder="email@address.com, John_20" id="forgot" onChange={e => setForgot(e.target.value)}/>
          </span>
        </div>

        <span>
          <button className="button submit" type="submit">Send email</button>
        </span><br/>
      </form>
        :
      <form className="auth__form" onSubmit={e => handleReset(e, reset, history)}>
        <h2 className="auth__title">Please type in the reset code sent by email with your new password.</h2><br/>
        <div className="auth__content">
          <span style={{display: 'none'}}><input type="hidden"/></span>
          <span>
            <label htmlFor="reset">Reset code</label>
            <input placeholder="a01b23c45d67e89f" id="reset" onChange={e => setReset({...reset, token: e.target.value})}/>
          </span>
          <span>
            <label htmlFor="password">Password</label>
            <input placeholder="••••" id="password" type="password" onChange={e => setReset({...reset, password: e.target.value})}/>
          </span>
          <span>
            <label htmlFor="confirm">Confirm password</label>
            <input placeholder="••••" id="confirm" type="password" onChange={e => setReset({...reset, passCheck: e.target.value})}/>
          </span>
        </div>

        <span>
          <button className="button submit" type="submit">Reset password</button>
        </span><br/>
      </form>}
    </div>
  )
}