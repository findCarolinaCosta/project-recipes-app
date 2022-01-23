import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../components/RecipeCard';
import { Context } from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchMealsByCategories from '../services/fetchMealsByCategories';
import fetchMeals from '../services/fetchMeals';

function FoodsRecipes(props) {
  const { mealsCategories, setMeals,
    setSharedProps, setRouteCurrent, setHistoryCurrent } = useContext(Context);
  const maxCategories = 8;
  const [nameBtn, setnameBtn] = useState('');

  useEffect(() => setSharedProps(props), [props, setSharedProps]);

  useEffect(() => {
    setRouteCurrent(props.history.location.pathname);
    setHistoryCurrent(props.history);
  }, []);

  const filteredByCategory = (categoryName, event) => {
    if (nameBtn === event.target.name) {
      fetchMeals().then((response) => setMeals(response.meals));
      setnameBtn('');
    } else {
      fetchMealsByCategories(categoryName)
        .then((response) => setMeals(response));
      setnameBtn(event.target.name);
    }
  };
  return (
    <div className="recipes-container container-fluid p-0 bg-red-700">
      <header className="border-0">
        <Header className="container-fluid" props={ props } />
      </header>
      <section className="btn-group flex-wrap" role="group">
        { mealsCategories.length !== 0
      && mealsCategories.map((categorizeiMeal, index) => {
        if (index < maxCategories) {
          return (
            <button
              data-testid={ `${categorizeiMeal.strCategory}-category-filter` }
              type="button"
              key={ categorizeiMeal.strCategory }
              name={ categorizeiMeal.strCategory }
              onClick={
                (event) => filteredByCategory(categorizeiMeal.strCategory, event)
              }
              className="btn btn-outline-danger"
            >
              {categorizeiMeal.strCategory}

            </button>
          );
        }
        return null;
      })}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={
            () => fetchMeals()
              .then((response) => setMeals(response.meals))
          }
          className="btn btn-outline-danger"
        >
          All
        </button>
      </section>
      <div className="row">
        <RecipeCard
          className="container-fluid"
          itemToMap="meals"
          props={ props }
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default FoodsRecipes;

FoodsRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
