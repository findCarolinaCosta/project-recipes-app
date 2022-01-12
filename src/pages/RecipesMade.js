import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import CardRecipesMade from '../components/CardRecipesMade';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';

function RecipesMade() {
  const { setDoneRecipesFilteredByName } = useContext(Context);

  const handleClickFiltered = ({ target }) => {
    switch (target.name) {
    case 'All':
      return setDoneRecipesFilteredByName('All');
    case 'Drinks':
      return setDoneRecipesFilteredByName('Drinks');
    case 'Foods':
      return setDoneRecipesFilteredByName('Foods');
    default:
      return null;
    }
  };

  return (
    <div>
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
      <h3 className="text-center" data-testid="page-title">Receitas Feitas</h3>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        name="All"
        onClick={ handleClickFiltered }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        name="Foods"
        onClick={ handleClickFiltered }
      >
        Foods
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        name="Drinks"
        onClick={ handleClickFiltered }
      >
        Drinks
      </button>
      <CardRecipesMade />
      <Footer />
    </div>
  );
}

export default RecipesMade;

RecipesMade.propTypes = {
  target: PropTypes.shape({
    name: PropTypes.shape(),
  }).isRequired,
};
