import React, { useContext, useState } from 'react';

import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { Context } from '../context/Context';
import fetchDrinks from '../services/fetchDrinks';
import fetchDrinksByCategory from '../services/fetchDrinksByCategory';

function DrinksRecipes(props) {
  const { drinksCategories, setDrinks } = useContext(Context);
  const maxCategories = 5;
  const [nameBtn, setnameBtn] = useState('');

  const filteredByCategory = (categoryName, event) => {
    if (nameBtn === event.target.name) {
      fetchDrinks().then((response) => setDrinks(response.drinks));
      setnameBtn('');
    } else {
      fetchDrinksByCategory(categoryName)
        .then((response) => setDrinks(response));
      setnameBtn(event.target.name);
    }
  };

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
              name={ categorieDrink.strCategory }
              onClick={ (event) => filteredByCategory(categorieDrink.strCategory, event) }
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
