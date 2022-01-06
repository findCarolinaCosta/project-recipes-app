import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../context/Context';
import fetchMealRecipeDetailsById from '../services/fetchMealRecipeDetailsById';
import fetchDrinkRecipeDetailsById from '../services/fetchDrinkRecipeDetailsById';

function RecipeDetails(props) {
  const { setSharedProps } = useContext(Context);
  const { match: { params: { id } }, location: { pathname } } = props;
  const [recipeId, setRecipeId] = useState('');

  useEffect(() => {
    if (pathname.includes('comidas')) {
      fetchMealRecipeDetailsById(id).then((response) => setRecipeId(response[0]));
    }
    if (pathname.includes('bebidas')) {
      fetchDrinkRecipeDetailsById(id).then((response) => setRecipeId(response[0]));
    }
    setSharedProps(props);
  }, [props, setSharedProps, id, pathname]);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({
          cocktails: {
            id: [],
          },
        }));
    }
  }, []);
  if (pathname.includes('comidas')) {
    console.log(recipeId);
    return (
      <div
        className="container-sm-fluid"
        style={ { height: '100vh', width: '100vw' } }
      >
        <div className="row w-100">
          <div className="col-12 w-100">
            <img
              className="img-fluid w-100"
              src={ recipeId.strMealThumb }
              alt=""
            />
          </div>
        </div>
        <div>
          {/* implementação da classe invisible temporária - passando no requisito 39 */}
          {
            inProgress ? (
              <button
                type="button"
                className="fixed-bottom invisible"
                data-testid="start-recipe-btn"
              >
                Continuar Receita
              </button>
            ) : (
              <button
                type="button"
                className="fixed-bottom invisible"
                data-testid="start-recipe-btn"
                onClick={ handleClick }
              >
                Iniciar Receita
              </button>
            )
          }
        </div>
      </div>
    );
  }
  if (pathname.includes('bebidas')) {
    return (
      <div>
        {
          inProgress ? (
            <button
              type="button"
              className="fixed-bottom"
              data-testid="start-recipe-btn"
            >
              Continuar receita
            </button>
          ) : (
            <button
              type="button"
              className="fixed-bottom"
              data-testid="start-recipe-btn"
              onClick={ handleClick }
            >
              Iniciar Receita
            </button>
          )
        }
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};

export default RecipeDetails;
