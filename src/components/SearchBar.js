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
  const { props: { match: { path } } } = props;
  const [chosenSearch, setSearch] = useState({});
  const { meals, setMeals, drinks, setDrinks } = useContext(Context);

  const searchMeals = async (searchTerm) => {
    if (chosenSearch === 'ingredient') {
      fetchMealsByIngredient(searchTerm).then((response) => setMeals(response));
    } else if (chosenSearch === 'name') {
      fetchMealsByName(searchTerm).then((response) => setMeals(response));
    } else if (chosenSearch === 'firstletter') {
      if (searchTerm.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const letter = searchTerm.slice(0, 1);
        fetchMealsByFirstLetter(letter).then((response) => setMeals(response));
      }
    }
    return meals;
  };

  const searchDrinks = async (searchTerm) => {
    if (chosenSearch === 'ingredient') {
      fetchDrinksByIngredient(searchTerm).then((response) => setDrinks(response));
    } else if (chosenSearch === 'name') {
      fetchDrinksByName(searchTerm).then((response) => setDrinks(response));
    } else if (chosenSearch === 'firstletter') {
      if (searchTerm.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const letter = searchTerm.slice(0, 1);
        fetchDrinksByFirstLetter(letter).then((response) => setDrinks(response));
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
    <form>
      <div className="row">
        <div className="col-sm-3">
          <label htmlFor="ingredient-search">
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

          <label htmlFor="name-search">
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

          <label htmlFor="first-letter-search">
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
          <div className="col-sm-1">
            <button
              data-testid="exec-search-btn"
              type="button"
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
