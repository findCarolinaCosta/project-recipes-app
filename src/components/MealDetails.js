import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Context } from '../context/Context';
import makeIngredientsList from '../helpers/makeIngredientsList';
import Recommendeds from '../Recommendeds';
import fetchDrinkRecipeDetailsById from '../services/fetchDrinkRecipeDetailsById';
import fetchDrinks from '../services/fetchDrinks';
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
  const [toAccompany, setToAccompany] = useState([]);

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
  }, [pathname, setInProgress]);

  useEffect(() => {
    const generateAccompanimentsList = async () => {
      const listToReturn = [];
      const NUMBER_OF_ITEMS = 6;
      for (let index = 0; index < NUMBER_OF_ITEMS; index += 1) {
        fetchDrinks().then(({ drinks }) => listToReturn.push(drinks[index]));
      }
      setToAccompany(listToReturn);
    };
    generateAccompanimentsList();
  }, []);

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

      <ReactPlayer
        data-testid="video"
        width="95%"
        url={ recipe.strYoutube }
      />

      <div
        className="row d-flex"
        style={ { width: '100vw' } }
      >
        <div
          className="d-flex flex-wrap"
          style={ { width: '100vw' } }
        >
          <div className="row">
            <h1>Recommendeds</h1>
          </div>
          <Recommendeds items={ toAccompany } />
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
