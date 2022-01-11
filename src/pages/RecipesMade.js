import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../context/Context';
import CardRecipesMade from '../components/CardRecipesMade';
import Header from '../components/Header';

function RecipesMade(props) {
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
      <Header props={ props } />
      <h1>Receitas feitas</h1>
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
    </div>
  );
}

export default RecipesMade;

RecipesMade.propTypes = {
  target: PropTypes.shape({
    name: PropTypes.shape(),
  }).isRequired,
};
