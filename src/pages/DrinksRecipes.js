import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { Context } from '../context/Context';
import Footer from '../components/Footer';
import fetchDrinks from '../services/fetchDrinks';
import fetchDrinksByCategory from '../services/fetchDrinksByCategory';

function DrinksRecipes({ history }, props) {
  const { drinksCategories, setDrinks,
    setSharedProps, setRouteCurrent } = useContext(Context);
  const maxCategories = 5;
  const [nameBtn, setnameBtn] = useState('');

  useEffect(() => setSharedProps(props), [props, setSharedProps]);
  useEffect(() => {
    setRouteCurrent(history.location.pathname);
  }, []);

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
      <Footer />
    </div>
  );
}

export default DrinksRecipes;

DrinksRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
