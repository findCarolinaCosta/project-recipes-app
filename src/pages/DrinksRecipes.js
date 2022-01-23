import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { Context } from '../context/Context';
import Footer from '../components/Footer';
import fetchDrinks from '../services/fetchDrinks';
import fetchDrinksByCategory from '../services/fetchDrinksByCategory';

function DrinksRecipes(props) {
  const { drinksCategories, setDrinks,
    setSharedProps, setRouteCurrent, setHistoryCurrent } = useContext(Context);
  const maxCategories = 5;
  const [nameBtn, setnameBtn] = useState('');

  useEffect(() => setSharedProps(props), [props, setSharedProps]);
  useEffect(() => {
    setRouteCurrent(props.history.location.pathname);
    setHistoryCurrent(props.history);
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
    <div className="recipes-container container-fluid p-0 bg-red-700">
      <header className="border-0">
        <Header className="container-fluid" props={ props } />
      </header>
      <section className="btn-group flex-wrap" role="group">
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
                className="btn btn-outline-danger"
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
          className="btn btn-outline-danger"
        >
          All
        </button>
        <div>
          <RecipeCard
            className="container-fluid"
            itemToMap="drinks"
            props={ props }
          />
        </div>
      </section>
      <div>
        <Footer />
      </div>
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
