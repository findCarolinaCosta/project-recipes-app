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
          <button
            type="button"
            className="fixed-bottom"
            data-testid="start-recipe-btn"
          >
            Iniciar Receita
          </button>
        </div>
      </div>
    );
  }
  if (pathname.includes('bebidas')) {
    return (
      <div>
        <button
          type="button"
          className="fixed-bottom"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};

export default RecipeDetails;
