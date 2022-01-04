import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../components/RecipeCard';
import { Context } from '../context/Context';
import Footer from '../components/Footer';

function FoodsRecipes({ history }) {
  const { mealsCategories } = useContext(Context);
  const maxCategories = 5;
  return (
    <div>
      <h1>Receitas de comidas</h1>
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
      <RecipeCard itemToMap="meals" />
      <Footer history={ history } />
    </div>
  );
}

FoodsRecipes.propTypes = {
  history: PropTypes.func.isRequired,
};

export default FoodsRecipes;
