import React, { useContext, useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Context } from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchMealsByCategories from '../services/fetchMealsByCategories';
import fetchMeals from '../services/fetchMeals';

function FoodsRecipes(props) {
  const { setSharedProps } = useContext(Context);
  setSharedProps(props);
  return (
    <div className="recipes-container container-fluid">
      <header className="row">
        <Header className="container-fluid" props={ props } />
      </header>
      { mealsCategories.map((categorizeiMeal, index) => {
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
      >
        All
      </button>
      <div className="row">
        <RecipeCard
          className="container-fluid"
          itemToMap="meals"
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default FoodsRecipes;
