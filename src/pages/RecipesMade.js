import React from 'react';
import CardRecipesMade from '../components/CardRecipesMade';
import Header from '../components/Header';

function RecipesMade(props) {
  return (
    <div>
      <Header props={ props } />
      <h1>Receitas feitas</h1>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <CardRecipesMade />
    </div>
  );
}

export default RecipesMade;
