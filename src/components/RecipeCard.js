import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { Context } from '../context/Context';

// renderiza card simples
function RecipeCard({ itemToMap }) {
  const { meals, drinks } = useContext(Context);
  const renderedQuantity = 12;
  return (
    <div className="container-fluid d-flex flex-wrap justify-content-center">
      <div className="row">
        <h1 className="text-center">Receitas de comidas</h1>
      </div>
      <div className="d-flex row w-100">
        <div className="d-flex flex-wrap justify-content-center">
          {(itemToMap === 'meals' && meals) ? meals.map((meal, index) => {
            if (index < renderedQuantity) {
              return (
                <div
                  className="custom-card col-sm-6 col-md-3"
                  style={ { width: '40vw' } }
                  data-testid={ `${index}-recipe-card` }
                  key={ meal.idMeal }
                >
                  <img
                    className="img-thumbnail"
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                    data-testid={ `${index}-card-img` }
                    width="100px"
                  />
                  <h4 className="card-title" data-testid={ `${index}-card-name` }>
                    {meal.strMeal}
                  </h4>
                </div>

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
      </div>
    </div>
  );
}

RecipeCard.propTypes = {
  itemToMap: PropTypes.string.isRequired,
};

export default RecipeCard;
