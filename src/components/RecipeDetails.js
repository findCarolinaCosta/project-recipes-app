import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../context/Context';
import fetchMealRecipeDetailsById from '../services/fetchMealRecipeDetailsById';
import fetchDrinkRecipeDetailsById from '../services/fetchDrinkRecipeDetailsById';
import ButtonFavorite from './ButtonFavorite';
import ButtonShare from './ButtonShare';
import DrinksDetails from './DrinksDetails';

function RecipeDetails(props) {
  const { setSharedProps, recipesInProgress,
    setRecipeInProgress, inProgress, setInProgress } = useContext(Context);
  const { match: { params: { id } }, location: { pathname }, history } = props;
  const [recipeId, setRecipeId] = useState('');

  useEffect(() => {
    setSharedProps(props);
    return () => (pathname.includes('bebidas')
      ? fetchDrinkRecipeDetailsById(id).then((response) => setRecipeId(response[0]))
      : fetchMealRecipeDetailsById(id).then((response) => setRecipeId(response[0])));
  }, [props, setSharedProps, id, pathname]);

  useEffect(() => (localStorage.getItem('inProgressRecipes') !== null
    ? setRecipeInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')))
    : localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress))), []);

  useEffect(() => {
    const currentRouteName = pathname.split('/')[1];
    const currentRecipeId = pathname.split('/')[2];
    const verifyRecipe = currentRouteName === 'comidas'
      ? 'meals' : 'cocktails';
    const gettingProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes'))[verifyRecipe];

    return (localStorage.getItem('inProgressRecipes') !== null
      && setInProgress(gettingProgressRecipes
        ? Object.keys(gettingProgressRecipes)
          .some((recipeIdStorage) => recipeIdStorage === currentRecipeId)
        : false));
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

  return (
    pathname.includes('comidas') ? (
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
    ) : <DrinksDetails handleClick={ handleClick } Props={ props } />
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape(),
  }).isRequired,
};

export default RecipeDetails;
