import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { Context } from '../context/Context';

// renderiza card simples
function RecipeCard({ itemToMap }) {
  const { meals, drinks } = useContext(Context);
  const renderedQuantity = 12;
  return (
    <div className="meals row">
      { (itemToMap === 'meals' && meals) ? meals.map((meal, index) => {
        if (index < renderedQuantity) {
          return (
            <section data-testid={ `${index}-recipe-card` } key={ meal.idMeal }>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
                width="100px"
              />
              <h1 data-testid={ `${index}-card-name` }>{meal.strMeal}</h1>
            </section>
          );
        }
        return null;
      })
        : drinks.map((drink, index) => {
          if (index < renderedQuantity) {
            return (
              <section data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                  width="100px"
                />
                <h1 data-testid={ `${index}-card-name` }>{drink.strDrink}</h1>
              </section>
            );
          }
          return null;
        })}
    </div>
  );
}

RecipeCard.propTypes = {
  itemToMap: PropTypes.string.isRequired,
};

export default RecipeCard;
