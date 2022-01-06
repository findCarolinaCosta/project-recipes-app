import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchMeals from '../services/fetchMeals';
import fetchDrinks from '../services/fetchDrinks';
import fetchDrinksCategories from '../services/fetchDrinksCategories';
import fetchMealsCategories from '../services/fetchMealsCategories';

const Context = createContext();
const { Provider, Consumer } = Context;

function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [sharedProps, setSharedProps] = useState({});
  const [inProgress, setInprogress] = useState(false);

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
    inProgress,
    setInprogress,
  };

  return (
    <Provider value={ context }>
      {children}
    </Provider>
  );
}

export { RecipesProvider as Provider, Consumer, Context };

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
