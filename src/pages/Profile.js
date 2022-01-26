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
    <div className="bg-red-700 w-screen">
      <div className="p-3 bg-red-700 m-0 grid grid-cols-3 grid-rows-1">
        <Link to="/perfil">
          <button type="button">
            <img
              src={ profileIcon }
              alt="profile-icon"
              className="bg-red-700"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
        <h3
          className="bg-transparent text-center font-black"
          data-testid="page-title"
        >
          Perfil

        </h3>
      </div>
      <div className="w-screen h-screen flex flex-col justify-center">
        <p
          data-testid="profile-email"
          className="text-center text-xl font-semibold"
        >
          {emailByLocalStorage}
        </p>
        <section className="text-center gap-10 flex flex-col">
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/receitas-feitas') }
            className="text-2xl btn btn-outline-danger w-6/12 p-3 self-center "
          >
            Receitas Feitas

          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/receitas-favoritas') }
            className="text-2xl btn btn-outline-danger w-6/12 p-3 self-center "

          >
            Receitas Favoritas
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => getExit(history) }
            className="text-2xl btn btn-outline-danger w-6/12 p-3 self-center"
          >
            LOGOUT
          </button>
        </section>
      </div>
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
