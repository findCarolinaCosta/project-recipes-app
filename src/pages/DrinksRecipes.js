import React, { useContext, useEffect, useState } from 'react';

import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { Context } from '../context/Context';
import fetchDrinks from '../services/fetchDrinks';
import fetchDrinksByCategory from '../services/fetchDrinksByCategory';

function DrinksRecipes(props) {
  const { drinksCategories, setDrinks, setSharedProps } = useContext(Context);
  const maxCategories = 5;
  const [nameBtn, setnameBtn] = useState('');

  useEffect(() => setSharedProps(props), [props, setSharedProps]);

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
      {drinksCategories.map((categoriseDrink, index) => {
        if (index < maxCategories) {
          return (
            <button
              data-testid={ `${categoriseDrink.strCategory}-category-filter` }
              type="button"
              key={ categoriseDrink.strCategory }
              name={ categoriseDrink.strCategory }
              onClick={
                (event) => filteredByCategory(categoriseDrink.strCategory, event)
              }
            >
              {categoriseDrink.strCategory}
            </button>
          );
        }
        return null;
      })}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={
          () => fetchDrinks()
            .then((response) => setDrinks(response.drinks))
        }
      >
        All
      </button>
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
