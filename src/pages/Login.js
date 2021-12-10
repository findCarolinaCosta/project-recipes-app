import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';

const getDisabled = (email, password) => {
  const checkEmail = () => {
    const verify = /\S+@\S+\.\S+/;
    return verify.test(email);
  };
  const passwordCharacters = 6;
  const checkPassword = () => password.length > passwordCharacters;

  return checkEmail() && checkPassword();
};

function Login({ history }) {
  const { email, setEmail } = useContext(Context);
  const [password, setPassword] = useState('');

  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  return (
    <form className="container form-group">
      <label htmlFor="email">
        <input
          id="email"
          type="email"
          data-testid="email-input"
          name="emailInput"
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
