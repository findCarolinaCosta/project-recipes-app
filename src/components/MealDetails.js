import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import makeIngredientsList from '../helpers/makeIngredientsList';
import fetchDrinkRecipeDetailsById from '../services/fetchDrinkRecipeDetailsById';
import fetchMealRecipeDetailsById from '../services/fetchMealRecipeDetailsById';
import ButtonFavorite from './ButtonFavorite';
import ButtonProgress from './ButtonProgress';
import ButtonShare from './ButtonShare';

function MealDetails({ props }) {
  const { setSharedProps,
    setInProgress,
    recipesInProgress,
    setRecipeInProgress,
    setIsRecipesDone,
    recipesDone,
  } = useContext(Context);
  const { match: { params: { id } },
    location: { pathname } } = props;
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState();

  useEffect(() => {
    if (pathname.includes('comidas')) {
      fetchMealRecipeDetailsById(id).then((response) => setRecipe(response[0]));
    }
    if (pathname.includes('bebidas')) {
      fetchDrinkRecipeDetailsById(id).then((response) => setRecipe(response[0]));
    }
    setSharedProps(props);
  }, [props, setSharedProps, id, pathname]);

  useEffect(() => {
    const ingredientsList = makeIngredientsList(recipe);
    setIngredients(ingredientsList);
  }, [recipe]);

  useEffect(() => (localStorage.getItem('inProgressRecipes') !== null
    ? setRecipeInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')))
    : localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress))),
  [recipesInProgress, setRecipeInProgress]);

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
  }, [pathname, setInProgress]);

  useEffect(() => {
    const currentRecipeId = pathname.split('/')[2];
    const gettingRecipesDone = JSON.parse(localStorage
      .getItem('doneRecipes'));
    return localStorage.getItem('inProgressRecipes') !== null
      && setIsRecipesDone(gettingRecipesDone
        ? Array.from(gettingRecipesDone)
          .some((recipeDoneIdStorage) => recipeDoneIdStorage.id === currentRecipeId)
        : false);
  }, [setIsRecipesDone, pathname, recipesDone]);

  return (

    <div
      className="container-fluid"
      style={ { height: '100vh', width: '100vw' } }
    >
      <div className="row d-flex w-100">

        <div className="col-12 d-flex w-100">
          <img
            data-testid="recipe-photo"
            className="img-fluid"
            src={ recipe.strMealThumb }
            alt={ `Foto da receita
            ${recipe.strMeal}, que contém ${recipe.strIngredient1} 
            e ${recipe.strIngredient2} entre outros ingredientes.` }
          />
        </div>

        <div className="row d-flex justify-content-between">
          <div className="col-6">
            <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
          </div>
          <div className="col-3">
            <ButtonShare props={ props } />
          </div>
          <div className="col-3">
            <ButtonFavorite props={ props } />
          </div>
        </div>

      </div>

      <div className="row">
        <div className="col-12">
          <h4 data-testid="recipe-category">{ recipe.strCategory }</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h1>Ingredients</h1>
        </div>
        {ingredients
      && (
        <div className="col-12">
          <ul>
            {ingredients.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ `${ingredient.ingredientName}${index}` }
              >
                {`${ingredient.ingredientName} - ${ingredient.ingredientMeasure}`}
              </li>
            ))}
          </ul>
        </div>)}
      </div>

      <div className="row">
        <div className="col-12">
          <h1>Instructions</h1>
        </div>
        <div>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
        </div>
      </div>

      <div className="row">
        <video data-testid="video" className="embed-responsive">
          <track kind="captions" />
          <source className="embed-responsive-item" src={ recipe.strYoutube } />
        </video>
      </div>

      <div className="row d-flex w-100">
        <div className="d-flex flex-wrap justify-content-center">
          <Link
            className="custom-card col-sm-6 col-md-3"
            style={ { width: '40vw' } }
            data-testid="0-recomendation-card"
            key="teste"
            to={ `/bebidas/${recipe.idMeal}` }
          >
            <img
              className="img-thumbnail"
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid="card-img"
              width="100px"
            />
            <h4 className="card-title" data-testid="card-name">
              {recipe.strMeal}
            </h4>
          </Link>
        </div>
      </div>

      <div className="row">
        <ButtonProgress props={ props } />
      </div>

    </div>
  );
}

MealDetails.propTypes = {
  props: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default MealDetails;
