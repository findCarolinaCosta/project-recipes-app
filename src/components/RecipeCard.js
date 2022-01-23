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
            <h3
              className="text-center
              text-red-900 font-black  p-3"
              data-testid="page-title"
            >
              Comidas

            </h3>
          </div>)
        : (
          <div className="row">
            <h3
              className="text-center
              text-red-900 font-black  p-3"
              data-testid="page-title"
            >
              Bebidas

            </h3>
          </div>)}

      <div className="d-flex row w-100 mb-40">
        <div className="d-flex flex-wrap justify-content-center gap-5">
          {(itemToMap === 'meals' && meals) ? meals.map((meal, index) => {
            if (index < renderedQuantity) {
              return (
                <section className="card shadow-lg bg-body rounded">
                  <Link
                    style={ { width: '40vw' } }
                    data-testid={ `${index}-recipe-card` }
                    key={ meal.idMeal }
                    to={ `/comidas/${meal.idMeal}` }
                  >
                    <img
                      className="card-img-top"
                      src={ meal.strMealThumb }
                      alt={ meal.strMeal }
                      data-testid={ `${index}-card-img` }
                    />
                    <div className="card-body bg-white">
                      <h4
                        className="card-title bg-transparent"
                        data-testid={ `${index}-card-name` }
                      >
                        {meal.strMeal}
                      </h4>
                    </div>
                  </Link>
                </section>
              );
            }
            return null;
          })
            : drinks.map((drink, index) => {
              if (index < renderedQuantity) {
                return (
                  <section className="card shadow-lg bg-body rounded">
                    <Link
                      style={ { width: '40vw' } }
                      data-testid={ `${index}-recipe-card` }
                      key={ drink.idDrink }
                      to={ `/bebidas/${drink.idDrink}` }
                    >
                      <img
                        className="card-img-top"
                        src={ drink.strDrinkThumb }
                        alt={ drink.strDrink }
                        data-testid={ `${index}-card-img` }
                        width="100px"
                      />
                      <div className="card-body bg-white">
                        <h4
                          className="card-title bg-transparent"
                          data-testid={ `${index}-card-name` }
                        >
                          {drink.strDrink}
                        </h4>
                      </div>
                    </Link>
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
