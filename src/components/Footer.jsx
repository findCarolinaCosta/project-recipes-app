import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass, faCocktail, faUtensils } from '@fortawesome/free-solid-svg-icons';

function Footer({ history }) {
  return (
    <footer
      className="fixed-bottom center d-flex justify-content-center"
      data-testid="footer"
    >
      <button
        className="btn btn-secondary"
        type="button"
        onClick={ () => history.push('/teste') }
        data-testid="explore-bottom-btn"
      >
        <FontAwesomeIcon icon={ faCompass } />
      </button>
      <button
        className="btn btn-secondary"
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ () => history.push('/teste') }
      >
        <FontAwesomeIcon icon={ faCocktail } />
      </button>
      <button
        className="btn btn-secondary"
        data-testid="food-bottom-btn"
        type="button"
        onClick={ () => history.push('') }
      >
        <FontAwesomeIcon icon={ faUtensils } />
      </button>

    </footer>
  );
}

Footer.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Footer;
