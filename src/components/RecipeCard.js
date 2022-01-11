import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';

// renderizaa card simples
function RecipeCard({ itemToMap }) {
  const { meals, drinks } = useContext(Context);
  const renderedQuantity = 12;
  return (
    <div className="container-fluid d-flex flex-wrap justify-content-center">
      {itemToMap === 'meals' && meals
        ? (
          <div className="row">
            <h1 className="text-center">Receitas de comidas</h1>
          </div>)
        : (
          <div className="row">
            <h1 className="text-center">Receitas de bebidas</h1>
          </div>)}

      <div className="d-flex row w-100">
        <div className="d-flex flex-wrap justify-content-center">
          {(itemToMap === 'meals' && meals) ? meals.map((meal, index) => {
            if (index < renderedQuantity) {
              return (
                <Link
                  className="custom-card col-sm-6 col-md-3"
                  style={ { width: '40vw' } }
                  data-testid={ `${index}-recipe-card` }
                  key={ meal.idMeal }
                  to={ `/comidas/${meal.idMeal}` }
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
                </Link>
              );
            }
            return null;
          })
            : drinks.map((drink, index) => {
              if (index < renderedQuantity) {
                return (
                  <Link
                    className="custom-card col-sm-6 col-md-3"
                    style={ { width: '40vw' } }
                    data-testid={ `${index}-recipe-card` }
                    key={ drink.idDrink }
                    to={ `/bebidas/${drink.idDrink}` }
                  >
                    <img
                      className="img-thumbnail"
                      src={ drink.strDrinkThumb }
                      alt={ drink.strDrink }
                      data-testid={ `${index}-card-img` }
                      width="100px"
                    />
                    <h4 className="card-title" data-testid={ `${index}-card-name` }>
                      {drink.strDrink}
                    </h4>
                  </Link>
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
