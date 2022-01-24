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
    <div className="container-fluid p-0 w-screen">

      <section>
        <img
          data-testid="recipe-photo"
          className="w-full"
          src={ recipe.strDrinkThumb }
          alt={ `Foto da receita
                ${recipe.strDrink}, que contém ${recipe.strIngredient1} 
                e ${recipe.strIngredient2} entre outros ingredientes.` }
        />
      </section>

      <div className="p-3">

        <section className="flex justify-between pr-4 pt-3">
          <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
          <div className="flex">
            <ButtonShare props={ props } />
            <ButtonFavorite props={ props } />
          </div>
        </section>
        <section>
          <h4
            data-testid="recipe-category"
            className="text-muted"
          >
            { recipe.strAlcoholic }
          </h4>

          <div>
            <h1>Ingredients</h1>
            {ingredients
          && (
            <div>
              <ul className="bg-neutral mr-2 rounded-md">
                {ingredients.map((ingredient, index) => (
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ `${ingredient.ingredientName}${index}` }
                    className="bg-transparent p-1 pl-3"
                  >
                    {`${ingredient.ingredientName} - ${ingredient.ingredientMeasure}`}
                  </li>
                ))}
              </ul>
            </div>)}
          </div>

          <div className="">
            <h1>Instructions</h1>
            <p
              data-testid="instructions"
              className="bg-neutral rounded-md p-4 mb-7"
            >
              { recipe.strInstructions }

            </p>
          </div>

          <div className="flex flex-col w-full">
            <h1>Recommendeds</h1>

            <Recommendeds items={ toAccompany } />
          </div>
        </section>
        <div className="mb-40">
          <ButtonProgress props={ props } />
        </div>
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
