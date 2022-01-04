import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { Context } from '../context/Context';

function DrinksRecipes(props) {
  const { drinksCategories } = useContext(Context);
  const maxCategories = 5;
  return (
    <div className="recipes-container container-fluid">
      <h1>Receitas de comidas</h1>
      <header className="row">
        <Header className="container-fluid" props={ props } />
      </header>
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
      <div className="row">
        <RecipeCard
          className="container-fluid"
          itemToMap="drinks"
          props={ props }
        />
      </div>
    </div>
  );
}

export default DrinksRecipes;
