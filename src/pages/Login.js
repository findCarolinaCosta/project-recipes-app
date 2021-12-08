import React, { useState } from 'react';

const getDisabled = (email, password) => {
  const checkEmail = () => {
    const verify = /\S+@\S+\.\S+/;
    return verify.test(email);
  };
  const passwordCharacters = 6;
  const checkPassword = () => password.length > passwordCharacters;

  return checkEmail() && checkPassword();
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  };

  return (
    <form className="container form-group">
      <label htmlFor="email">
        <input
          id="email"
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        <input
          id="password"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !getDisabled(email, password) }
        onClick={ handleClick }
      >
        Entrar

      </button>
    </form>
  );
}

export default Login;
