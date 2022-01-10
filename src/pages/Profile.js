import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import getExit from '../helpers/getExit';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Context } from '../context/Context';

function Profile(props) {
  const { history } = props;
  const emailByLocalStorage = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')).email : 'usuário não identificado';
  const { setSharedProps } = useContext(Context);
  useEffect(() => setSharedProps(props), [props, setSharedProps]);

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
      <Footer />
    </section>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
