import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../components/RecipeCard';
import { Context } from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchMealsByCategories from '../services/fetchMealsByCategories';
import fetchMeals from '../services/fetchMeals';

function FoodsRecipes(props) {
  const { history } = props;
  const { mealsCategories, setMeals } = useContext(Context);
  const maxCategories = 5;
  const [nameBtn, setnameBtn] = useState('');

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
    <div className="recipes-container container-fluid">
      <header className="row">
        <Header className="container-fluid" props={ props } />
      </header>
      { mealsCategories.map((categorieMeal, index) => {
        if (index < maxCategories) {
          return (
            <button
              data-testid={ `${categorieMeal.strCategory}-category-filter` }
              type="button"
              key={ categorieMeal.strCategory }
              name={ categorieMeal.strCategory }
              onClick={ (event) => filteredByCategory(categorieMeal.strCategory, event) }
            >
              {categorieMeal.strCategory}

            </button>
          );
        }
        return null;
      })}
      <div className="row">
        <RecipeCard
          className="container-fluid"
          itemToMap="meals"
          props={ props }
        />
      </div>
      <div>
        <Footer history={ history } />
      </div>
    </div>
  );
}

FoodsRecipes.propTypes = {
  history: PropTypes.func.isRequired,
};

export default FoodsRecipes;
