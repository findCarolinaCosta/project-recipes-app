import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchMeals from '../services/fetchMeals';
import fetchDrinks from '../services/fetchDrinks';

const Context = createContext();
const { Provider, Consumer } = Context;

function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsCategories, setMealsCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchMeals().then((response) => setMeals(response.meals));
    fetchDrinks().then((response) => setDrinks(response.drinks));
    // retirei as funções de requisição abaixo por parecer não necessitar delas por hora
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
