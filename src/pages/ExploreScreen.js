import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import Footer from '../components/Footer';

function ExploreScreen({ history }) {
  return (
    <div className="bg-red-700 w-screen">
      <div className=" p-3 bg-red-700 m-0">
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
      </div>
      <section className="w-screen h-screen flex flex-col">
        <h3
          className="text-center
      text-red-900 font-black  p-3"
          data-testid="page-title"
        >
          Explorar
        </h3>
        <div className="btn-group gap-4 p-3">
          <button
            type="button"
            data-testid="explore-food"
            onClick={ () => history.push('/explorar/comidas') }
            className="btn btn-outline-danger"
          >
            Explorar Comidas

          </button>
          <button
            type="button"
            data-testid="explore-drinks"
            onClick={ () => history.push('/explorar/bebidas') }
            className="btn btn-outline-danger"
          >
            Explorar Bebidas

          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

ExploreScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExploreScreen;
