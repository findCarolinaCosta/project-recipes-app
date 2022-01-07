import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../context/Context';
import fetchMealRecipeDetailsById from '../services/fetchMealRecipeDetailsById';
import fetchDrinkRecipeDetailsById from '../services/fetchDrinkRecipeDetailsById';

function RecipeDetails(props) {
  const { setSharedProps, recipesInProgress, setRecipeInProgress } = useContext(Context);
  const { match: { params: { id } }, location: { pathname }, history } = props;
  const [recipeId, setRecipeId] = useState('');
  const [inProgress, setInProgress] = useState(false);

  const currentRecipeName = pathname.split('/')[1];

  const gettingRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
    .currentRecipeName === 'comida' ? 'meals' : 'cocktails';

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
    const currentRecipeId = pathname.split('/')[2];
    const verifyRecipe = currentRecipeName === 'comidas'
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
    const gettingRoute = currentRecipeName === 'comida' ? 'meals' : 'cocktails';
    const currentRecipeId = pathname.split('/')[2];
    setRecipeInProgress((state) => ({ ...state,
      [gettingRoute]: { [currentRecipeId]: [] } }));

    localStorage.setItem('inProgressRecipes', JSON.stringify(({ ...recipesInProgress,
      [gettingRoute]: { [currentRecipeId]: [] } })));
    history.push(`/${currentRecipeName}/${currentRecipeId}/in-progress`);
    if (localStorage.getItem('inProgressRecipes') !== null) {
      setInProgress(gettingRecipes
        ? Object.keys(gettingRecipes)
          .some((recipeIdStorage) => recipeIdStorage === currentRecipeId)
        : false);
    }
  };

  if (pathname.includes('comidas')) {
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
                className="fixed-bottom"
                data-testid="start-recipe-btn"
                onClick={ handleClick }
              >
                Continuar Receita
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
              onClick={ handleClick }
            >
              Continuar Receita
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
