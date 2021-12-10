import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchMealsCategories from '../services/fetchMealsCategories';
import fetchAreas from '../services/fetchAreas';
import fetchIngredients from '../services/fetchIngredients';
import fetchMeals from '../services/fetchMeals';
import fetchDrinks from '../services/fetchDrinks';
import fetchDrinksCategories from '../services/fetchDrinksCategories';

const Context = createContext();
const { Provider, Consumer } = Context;

function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);

  useEffect(() => {
    fetchMeals().then((response) => setMeals(response.meals));
    fetchDrinks().then((response) => setDrinks(response.drinks));
    fetchMealsCategories().then((response) => setMealsCategories(response.meals));
    fetchAreas().then((response) => setAreas(response.meals));
    fetchIngredients().then((response) => setIngredients(response.meals));
    fetchDrinksCategories().then((categories) => setDrinksCategories(categories));
  }, []);

  const context = {
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
