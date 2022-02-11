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
    <section className="flex flex-column m-auto rounded-md w-11/12">
      <span className="bg-white text-center">Versão mobile, por enquanto</span>
      <div
        className="bg-white rounded-md decoration-black
      text-base font-normal leading-6 p-12 relative"
      >
        <h1 className="text-center bg-white mb-4 text-danger font-bold">
          Login
        </h1>
        <form className="bg-white">
          <div className="bg-white mb-1">
            <span className="bg-white">Email</span>
          </div>
          <div className="wrap-input input-group label form-label mb-0 bg-white">
            <input
              className="form-control mb-4"
              data-testid="email-input"
              aria-label="email"
              type="email"
              name="email"
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </div>
          <div className="bg-white mb-1">
            <span className="bg-white">Password</span>
          </div>
          <div className="wrap-input input-group label form-label mb-4">
            <input
              id="password"
              className="form-control"
              data-testid="password-input"
              type="password"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </div>
          <button
            type="submit"
            data-testid="login-submit-btn"
            disabled={ !getDisabled(email, password) }
            onClick={ handleClick }
            className="btn btn-danger"
          >
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
