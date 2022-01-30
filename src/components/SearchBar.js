import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import fetchDrinksByFirstLetter from '../services/fetchDrinksByFirstLetter';
import fetchDrinksByIngredient from '../services/fetchDrinksByIngredient';
import fetchDrinksByName from '../services/fetchDrinksByName';
import fetchMealsByFirstLetter from '../services/fetchMealsByFirstLetter';
import fetchMealsByIngredient from '../services/fetchMealsByIngredient';
import fetchMealsByName from '../services/fetchMealsByName';

function SearchBar() {
  const [chosenSearch, setSearch] = useState({});
  const { meals, setMeals, drinks, setDrinks,
    searchTerm, isSearchByIngredient, routeCurrent, historyCurrent,
  } = useContext(Context);

  const redirectToDetails = async (receivedResponse) => {
    if (receivedResponse === null) {
      return global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    if (Object.keys(receivedResponse[0]).includes('idMeal')) {
      await setMeals(receivedResponse);
      if (receivedResponse.length === 1) {
        historyCurrent.push(`/comidas/${receivedResponse[0].idMeal}`);
      }
    }
    if (Object.keys(receivedResponse[0]).includes('idDrink')) {
      await setDrinks(receivedResponse);
      if (receivedResponse.length === 1) {
        historyCurrent.push(`/bebidas/${receivedResponse[0].idDrink}`);
      }
    }
  };

  const searchMeals = (searchTermParam) => {
    if (chosenSearch === 'ingredient') {
      fetchMealsByIngredient(searchTermParam)
        .then((response) => redirectToDetails(response));
    } else if (chosenSearch === 'name') {
      fetchMealsByName(searchTermParam)
        .then(async (response) => redirectToDetails(response));
    } else if (chosenSearch === 'firstletter') {
      if (searchTermParam.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const letter = searchTermParam.slice(0, 1);
        fetchMealsByFirstLetter(letter).then((response) => redirectToDetails(response));
      }
    }
    return meals;
  };

  const searchDrinks = async (searchTermParam) => {
    if (chosenSearch === 'ingredient') {
      fetchDrinksByIngredient(searchTermParam)
        .then((response) => redirectToDetails(response));
    } else if (chosenSearch === 'name') {
      fetchDrinksByName(searchTermParam).then((response) => redirectToDetails(response));
    } else if (chosenSearch === 'firstletter') {
      if (searchTermParam.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const letter = searchTermParam.slice(0, 1);
        fetchDrinksByFirstLetter(letter).then((response) => redirectToDetails(response));
      }
    }
    return drinks;
  };

  const searchRecipes = async (searchTermParam) => {
    if (routeCurrent === '/comidas') {
      await searchMeals(searchTermParam);
    }
    if (routeCurrent === '/bebidas') {
      await searchDrinks(searchTermParam);
    }
  };

  const handleRadioClick = ({ value }) => {
    setSearch(value);
  };

  useEffect(() => {
    if (isSearchByIngredient && routeCurrent) {
      if (routeCurrent === '/comidas') {
        fetchMealsByIngredient(searchTerm)
          .then((response) => redirectToDetails(response));
      }
      if (routeCurrent === '/bebidas') {
        fetchDrinksByIngredient(searchTerm)
          .then((response) => redirectToDetails(response));
      }
    }
  }, [routeCurrent]);

  return (
    <form>
      <div className="bg-red-700 p-1">
        <div className="bg-red-700">
          <label
            className="recipes-radio bg-red-700
          text-white"
            htmlFor="ingredient-search"
          >
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              name="search"
              checked={ isSearchByIngredient || null }
              value="ingredient"
              id="ingredient-search"
              onClick={ ({ target }) => handleRadioClick(target) }
            />
            <span className="ml-1 bg-red-700 text-white">Ingrediente</span>
          </label>

          <label className="recipes-radio bg-red-700 text-white" htmlFor="name-search">
            <input
              data-testid="name-search-radio"
              type="radio"
              name="search"
              value="name"
              id="name-search"
              onClick={ ({ target }) => handleRadioClick(target) }
            />
            <span className="ml-1 bg-red-700 text-white">Nome</span>
          </label>

          <label
            className="recipes-radio bg-red-700
          text-white"
            htmlFor="first-letter-search"
          >
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              name="search"
              value="firstletter"
              id="first-letter-search"
              onClick={ ({ target }) => handleRadioClick(target) }
            />
            <span className="ml-1 bg-red-700 text-white">Primeira letra</span>
          </label>
          <div className="col-sm-12 bg-red-700 p-2">
            <button
              data-testid="exec-search-btn"
              type="button"
              className="btn btn-success"
              onClick={ () => searchRecipes(searchTerm) }
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
