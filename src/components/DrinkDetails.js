import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import fetchDrinkRecipeDetailsById from '../services/fetchDrinkRecipeDetailsById';
import fetchMealRecipeDetailsById from '../services/fetchMealRecipeDetailsById';
import ButtonShare from './ButtonShare';
import ButtonFavorite from './ButtonFavorite';
import makeIngredientsList from '../helpers/makeIngredientsList';
import ButtonProgress from './ButtonProgress';
import fetchMeals from '../services/fetchMeals';
import Recommendeds from '../Recommendeds';

function DrinkDetails({ props }) {
  const { setSharedProps,
    setInProgress,
    recipesInProgress,
    setRecipeInProgress,
    setIsRecipesDone,
    recipesDone,
  } = useContext(Context);
  const { match: { params: { id } }, location: { pathname } } = props;
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
        fetchMeals().then(({ meals }) => listToReturn.push(meals[index]));
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
            src={ recipe.strDrinkThumb }
            alt={ `Foto da receita
                ${recipe.strDrink}, que contém ${recipe.strIngredient1} 
                e ${recipe.strIngredient2} entre outros ingredientes.` }
          />
        </div>

        <div className="row d-flex justify-content-between">
          <div className="col-6">
            <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
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
          <h3>{ recipe.strCategory }</h3>
          <h5 data-testid="recipe-category">{ recipe.strAlcoholic }</h5>
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

DrinkDetails.propTypes = {
  props: PropTypes.shape().isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinkDetails;
