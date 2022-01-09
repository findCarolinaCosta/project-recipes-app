import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../context/Context';
import DrinkDetails from './DrinkDetails';
import MealDetails from './MealDetails';

function RecipeDetails(props) {
  const { recipesInProgress,
    setRecipeInProgress } = useContext(Context);
  const { match: { params: { id } }, location: { pathname }, history } = props;

  const handleClick = () => {
    const currentRouteName = pathname.split('/')[1];
    const gettingRoute = currentRouteName === 'comidas' ? 'meals' : 'cocktails';
    const currentRecipeId = pathname.split('/')[2];
    setRecipeInProgress((state) => ({ ...state,
      [gettingRoute]: { [currentRecipeId]: [] } }));

    localStorage.setItem('inProgressRecipes', JSON.stringify(({ ...recipesInProgress,
      [gettingRoute]: { [currentRecipeId]: [] } })));

    history.push(`/${currentRouteName}/${id}/in-progress`);
  };

  if (pathname.includes('comidas')) {
    return (
      <MealDetails props={ props } handleClick={ handleClick } />
    );
  }

  if (pathname.includes('bebidas')) {
    return (
      <DrinkDetails props={ props } handleClick={ handleClick } />
    );
  }
}

RecipeDetails.propTypes = {
  location: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape(),
  }).isRequired,
};

export default RecipeDetails;
