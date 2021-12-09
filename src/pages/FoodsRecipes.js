import React from 'react';
import RecipeCard from '../components/RecipeCard';

function FoodsRecipes() {
  return (
    <div>
      <h1>Receitas de comidas</h1>
      <RecipeCard itemToMap="meals" />
    </div>
  );
}

export default FoodsRecipes;
