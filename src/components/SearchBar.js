import PropTypes from 'prop-types';
import React, { useState } from 'react';
import fetchMealsByFirstLetter from '../services/fetchMealsByFirstLetter';
import fetchMealsByIngredient from '../services/fetchMealsByIngredient';
import fetchMealsByName from '../services/fetchMealsByName';

function SearchBar(props) {
  const [chosenSearch, setSearch] = useState({});
  const [foundMeals, setFoundMeals] = useState([]);

  const searchMeals = async (searchTerm) => {
    if (chosenSearch === 'ingredient') {
      fetchMealsByIngredient(searchTerm).then((response) => setFoundMeals(response));
    } else if (chosenSearch === 'name') {
      fetchMealsByName(searchTerm).then((response) => setFoundMeals(response));
    } else if (chosenSearch === 'firstletter') {
      if (searchTerm.length > 1) {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        const letter = searchTerm.slice(0, 1);
        fetchMealsByFirstLetter(letter).then((response) => setFoundMeals(response));
      }
    }
    return foundMeals;
  };

  const handleRadioClick = ({ value }) => {
    console.log(value);
    setSearch(value);
  };

  return (
    <form>
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

      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => searchMeals(props.searchTerm) }
      >
        Buscar
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default SearchBar;
