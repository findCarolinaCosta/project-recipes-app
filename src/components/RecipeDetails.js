import React from 'react';
import DrinkDetails from './DrinkDetails';
import MealDetails from './MealDetails';

function RecipeDetails(props) {
  const { location: { pathname } } = props;
  if (pathname.includes('comidas')) {
    return (
      <MealDetails props={ props } />
    );
  }

  if (pathname.includes('bebidas')) {
    return (
      <DrinkDetails props={ props } />
    );
  }
}

export default RecipeDetails;
