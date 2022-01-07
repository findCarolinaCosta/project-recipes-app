import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../context/Context';
import fetchMealRecipeDetailsById from '../services/fetchMealRecipeDetailsById';
import fetchDrinkRecipeDetailsById from '../services/fetchDrinkRecipeDetailsById';
import ButtonFavorite from './ButtonFavorite';
import ButtonShare from './ButtonShare';

function RecipeDetails(props) {
  const { setSharedProps, recipesInProgress, setRecipeInProgress } = useContext(Context);
  const { match: { params: { id } }, location: { pathname }, history } = props;
  const [recipeId, setRecipeId] = useState('');
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    if (pathname.includes('comidas')) {
      fetchMealRecipeDetailsById(id).then((response) => setRecipeId(response[0]));
    }
    if (pathname.includes('bebidas')) {
      fetchDrinkRecipeDetailsById(id).then((response) => setRecipeId(response[0]));
    }
    setSharedProps(props);
  }, [props, setSharedProps, id, pathname]);

  useEffect(() => (localStorage.getItem('inProgressRecipes') !== null
    ? setRecipeInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')))
    : localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress))), []);

  useEffect(() => {
    const currentRouteName = pathname.split('/')[1];
    const currentRecipeId = pathname.split('/')[2];
    const gettingRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
      .currentRouteName === 'comida' ? 'meals' : 'cocktails';
    const verifyRecipe = currentRouteName === 'comidas'
      ? 'meals' : 'cocktails';

    const gettingProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'))[verifyRecipe];
    if (localStorage.getItem('inProgressRecipes') !== null) {
      setInProgress(gettingRecipes
        ? Object.keys(gettingProgressRecipes)
          .some((recipeIdStorage) => recipeIdStorage === currentRecipeId)
        : false);
    }
  }, [pathname]);

  const handleClick = () => {
    const currentRouteName = pathname.split('/')[1];
    const gettingRoute = currentRouteName === 'comidas' ? 'meals' : 'cocktails';
    const currentRecipeId = pathname.split('/')[2];
    setRecipeInProgress((state) => ({ ...state,
      [gettingRoute]: { [currentRecipeId]: [] } }));

    localStorage.setItem('inProgressRecipes', JSON.stringify(({ ...recipesInProgress,
      [gettingRoute]: { [currentRecipeId]: [] } })));

    history.push(`/${currentRouteName}/${id}/in-progress`);
  };

  if (pathname.includes('comidas')) {
    return (
      <div
        className="container-sm-fluid"
        style={ { height: '100vh', width: '100vw' } }
      >
        <nav className="in-progress-butons">
          <ButtonShare props={ props } />
          <ButtonFavorite props={ props } />
        </nav>
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
            onClick={ handleClick }
          >
            {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
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
          onClick={ handleClick }
        >
          {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
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
