import React from 'react';
import PropTypes from 'prop-types';
import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';

function Footer({ history }) {
  return (
    <footer
      className="fixed-bottom center d-flex justify-content-center mt-3"
      data-testid="footer"
    >
      <button
        className="btn btn-secondary mb-2 mr-1"
        data-testid="food-bottom-btn"
        type="button"
        onClick={ () => history.push('') }
      >
        <img src={ MealIcon } alt="Exibe Comidas" />
      </button>
      <button
        className="btn btn-secondary mb-2 mr-1"
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ () => history.push('/teste') }
      >
        <img src={ DrinkIcon } alt="Exibe Drinks" />
      </button>
      <button
        className="btn btn-secondary mb-2 mr-1"
        type="button"
        onClick={ () => history.push('/teste') }
        data-testid="explore-bottom-btn"
      >
        <img src={ ExploreIcon } alt="Exibe a localização" />
      </button>
    </footer>
  );
}

Footer.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Footer;
