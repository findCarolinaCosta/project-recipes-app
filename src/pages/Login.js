import React from 'react';

function Login() {
  return (
    <form>
      <label htmlFor="email">
        <input
          id="email"
          type="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        <input id="password" type="password" data-testid="password-input" />
      </label>
      <button type="submit" data-testid="login-submit-btn">Entrar</button>
    </form>
  );
}

export default Login;
