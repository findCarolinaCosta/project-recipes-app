import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import fetchDrinksByFirstLetter from '../services/fetchDrinksByFirstLetter';
import fetchDrinksByIngredient from '../services/fetchDrinksByIngredient';
import fetchDrinksByName from '../services/fetchDrinksByName';
import fetchMealsByFirstLetter from '../services/fetchMealsByFirstLetter';
import fetchMealsByIngredient from '../services/fetchMealsByIngredient';
import fetchMealsByName from '../services/fetchMealsByName';

function SearchBar(props) {
  const { props: { match: { path }, history } } = props;
  const [chosenSearch, setSearch] = useState({});
  const { meals, setMeals, drinks, setDrinks } = useContext(Context);

  const redirectToDetails = async (receivedResponse) => {
    if (receivedResponse === null) {
      return global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    if (Object.keys(receivedResponse[0]).includes('idMeal')) {
      await setMeals(receivedResponse);
      if (receivedResponse.length === 1) {
        history.push(`/comidas/${receivedResponse[0].idMeal}`);
      }
    }
    if (Object.keys(receivedResponse[0]).includes('idDrink')) {
      await setDrinks(receivedResponse);
      if (receivedResponse.length === 1) {
        history.push(`/bebidas/${receivedResponse[0].idDrink}`);
      }
    }
  };

  const searchMeals = (searchTerm) => {
    if (chosenSearch === 'ingredient') {
      fetchMealsByIngredient(searchTerm).then((response) => redirectToDetails(response));
    } else if (chosenSearch === 'name') {
      fetchMealsByName(searchTerm).then(async (response) => redirectToDetails(response));
    } else if (chosenSearch === 'firstletter') {
      if (searchTerm.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const letter = searchTerm.slice(0, 1);
        fetchMealsByFirstLetter(letter).then((response) => redirectToDetails(response));
      }
    }
    return meals;
  };

  const searchDrinks = async (searchTerm) => {
    if (chosenSearch === 'ingredient') {
      fetchDrinksByIngredient(searchTerm).then((response) => redirectToDetails(response));
    } else if (chosenSearch === 'name') {
      fetchDrinksByName(searchTerm).then((response) => redirectToDetails(response));
    } else if (chosenSearch === 'firstletter') {
      if (searchTerm.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const letter = searchTerm.slice(0, 1);
        fetchDrinksByFirstLetter(letter).then((response) => redirectToDetails(response));
      }
    }
    return drinks;
  };

  const searchRecipes = async (receivedTerm) => {
    if (path === '/comidas') {
      await searchMeals(receivedTerm);
    }
    if (path === '/bebidas') {
      await searchDrinks(receivedTerm);
    }
  };

  const handleRadioClick = ({ value }) => {
    setSearch(value);
  };

  return (
    <form className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <label className="recipes-radio" htmlFor="ingredient-search">
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              name="search"
              value="ingredient"
              id="ingredient-search"
              onClick={ ({ target }) => handleRadioClick(target) }
            />
            Ingrediente
          </label>

          <label className="recipes-radio" htmlFor="name-search">
            <input
              data-testid="name-search-radio"
              type="radio"
              name="search"
              value="name"
              id="name-search"
              onClick={ ({ target }) => handleRadioClick(target) }
            />
            Nome
          </label>

          <label className="recipes-radio" htmlFor="first-letter-search">
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              name="search"
              value="firstletter"
              id="first-letter-search"
              onClick={ ({ target }) => handleRadioClick(target) }
            />
            Primeira letra
          </label>
          <div className="col-sm-12">
            <button
              data-testid="exec-search-btn"
              type="button"
              className="recipes-search-btn"
              onClick={ () => searchRecipes(props.searchTerm) }
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  props: PropTypes.shape().isRequired,
};

export default SearchBar;
