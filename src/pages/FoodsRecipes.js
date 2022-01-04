import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../components/RecipeCard';
import { Context } from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';

function FoodsRecipes(props) {
  const { history } = props;
  const { mealsCategories } = useContext(Context);
  const maxCategories = 5;
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
