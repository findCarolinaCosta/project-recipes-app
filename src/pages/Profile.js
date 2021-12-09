import PropTypes from 'prop-types';
import React from 'react';
import getExit from '../helpers/getExit';

function Profile({ history }) {
  const emailByLocalStorage = JSON.parse(localStorage.getItem('user')).email;
  return (
    <section>
      <h1> Página de perfil</h1>
      <p data-testid="profile-email">{emailByLocalStorage}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas

      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas

      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => getExit(history) }
      >
        Sair

      </button>
    </section>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
