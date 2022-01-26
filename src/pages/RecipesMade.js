import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import CardRecipesMade from '../components/CardRecipesMade';
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
    <div className="h-screen w-screen flex flex-col">
      <section className="p-3 bg-red-700 m-0 grid grid-cols-4 grid-rows-1">
        <Link to="/perfil">
          <button type="button">
            <img
              src={ profileIcon }
              alt="profile-icon"
              className="bg-transparent mt-1"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
        <h3
          className="bg-transparent col-start-2 col-span-4 mt-auto mb-auto"
          data-testid="page-title"
        >
          Receitas Feitas
        </h3>
      </section>
      <section className="btn-group p-3">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          name="All"
          onClick={ handleClickFiltered }
          className="btn btn-outline-danger"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          name="Foods"
          onClick={ handleClickFiltered }
          className="btn btn-outline-danger"
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          name="Drinks"
          onClick={ handleClickFiltered }
          className="btn btn-outline-danger"
        >
          Drinks
        </button>
      </section>
      <CardRecipesMade />
    </div>
  );
}

export default RecipesMade;

RecipesMade.propTypes = {
  target: PropTypes.shape({
    name: PropTypes.shape(),
  }).isRequired,
};
