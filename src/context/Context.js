import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchMeals from '../services/fetchMeals';
import fetchDrinks from '../services/fetchDrinks';
import fetchDrinksCategories from '../services/fetchDrinksCategories';
import fetchMealsCategories from '../services/fetchMealsCategories';

const Context = createContext();
const { Provider, Consumer } = Context;

const INICIAL_FAVORITE_STORAGE = localStorage
  .getItem('favoriteRecipes')
  ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

function RecipesProvider(props) {
  const { children } = props;
  const [email, setEmail] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [sharedProps, setSharedProps] = useState({});
  const [recipesInProgress, setRecipeInProgress] = useState({ cocktails: {}, meals: {} });
  const [favoriteStorage, setFavoriteStorage] = useState(INICIAL_FAVORITE_STORAGE);
  const [isFavorite, setIsFavorite] = useState(favoriteStorage);
  const [recipe, setRecipe] = useState({});
  const [inProgress, setInProgress] = useState(false);
  const [recipesDone, setRecipesDone] = useState([]);
  const [isRecipesDone, setIsRecipesDone] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [doneRecipesFilteredByName, setDoneRecipesFilteredByName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchByIngredient, setIsSearchByIngredient] = useState(false);
  const [routeCurrent, setRouteCurrent] = useState('');

  useEffect(() => {
    fetchMeals().then((response) => setMeals(response.meals));
    fetchDrinks().then((response) => setDrinks(response.drinks));
    fetchDrinksCategories().then((response) => setDrinksCategories(response));
    fetchMealsCategories().then((response) => setMealsCategories(response));
  }, []);

  const context = {
    sharedProps,
    setSharedProps,
    email,
    meals,
    drinks,
    mealsCategories,
    areas,
    ingredients,
    setEmail,
    setMeals,
    setDrinks,
    setMealsCategories,
    setAreas,
    setIngredients,
    drinksCategories,
    recipesInProgress,
    setRecipeInProgress,
    isFavorite,
    setIsFavorite,
    favoriteStorage,
    setFavoriteStorage,
    recipe,
    setRecipe,
    inProgress,
    setInProgress,
    recipesDone,
    setRecipesDone,
    isRecipesDone,
    setIsRecipesDone,
    doneRecipes,
    setDoneRecipes,
    doneRecipesFilteredByName,
    setDoneRecipesFilteredByName,
    searchTerm,
    setSearchTerm,
    isSearchByIngredient,
    setIsSearchByIngredient,
    routeCurrent,
    setRouteCurrent,
  };

  return <Provider value={ context }>{children}</Provider>;
}

export { RecipesProvider as Provider, Consumer, Context };

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
