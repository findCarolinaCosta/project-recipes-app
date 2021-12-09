import React from 'react';
import CardRecipesMade from '../components/CardRecipesMade';

function RecipesMade() {
  // pode ser modificado
  return (
    <div>
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
