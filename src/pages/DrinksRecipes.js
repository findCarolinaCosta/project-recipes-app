import React, { useContext } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Context } from '../context/Context';

function DrinksRecipes() {
  const { drinksCategories } = useContext(Context);
  const maxCategories = 5;
  return (
    <div>
      <h1>Receitas de comidas</h1>
      {drinksCategories.map((categorieDrink, index) => {
        if (index < maxCategories) {
          return (
            <button
              data-testid={ `${categorieDrink.strCategory}-category-filter` }
              type="button"
              key={ categorieDrink.strCategory }
            >
              {categorieDrink.strCategory}
            </button>
          );
        }
        return null;
      })}
      <RecipeCard itemToMap="drinks" />
    </div>
  );
}

export default DrinksRecipes;
