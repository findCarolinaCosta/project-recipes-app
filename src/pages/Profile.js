import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import getExit from '../helpers/getExit';
import Footer from '../components/Footer';
import { Context } from '../context/Context';
import profileIcon from '../images/profileIcon.svg';

function Profile(props) {
  const { history } = props;
  const emailByLocalStorage = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')).email : 'usuário não identificado';
  const { setSharedProps } = useContext(Context);
  useEffect(() => setSharedProps(props), [props, setSharedProps]);

  return (
    <div className="row">
      <div className="col-sm-2">
        <Link to="/perfil">
          <button type="button">
            <img
              src={ profileIcon }
              alt="profile-icon"
              className="header-profile-icon"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
      </div>
      <h3 className="text-center" data-testid="page-title">Perfil</h3>
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
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
