import PropTypes from 'prop-types';
import React from 'react';
import getExit from '../helpers/getExit';
import Header from '../components/Header';

function Profile(props) {
  const { history } = props;
  const emailByLocalStorage = JSON.parse(localStorage.getItem('user')).email;
  return (
    <section>
      <Header props={ props } />
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
