import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../context/Context';
import fetchMealRecipeDetailsById from '../services/fetchMealRecipeDetailsById';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import fetchDrinksRecipeDetailsById from '../services/fetchDrinksRecipeDetailsById';

function ButtonFavorite(props) {
  const { props: { match: { params: { id } }, location: { pathname } } } = props;
  const recipeID = id;
  const { isFavorite, setIsFavorite,
    favoriteStorage, setFavoriteStorage,
    recipe, setRecipe } = useContext(Context);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes')) !== null) {
      JSON.parse(localStorage.getItem('favoriteRecipes'))
        .forEach((item) => (item.id === id ? setIsFavorite(true) : setIsFavorite(false)));
    } else {
      setIsFavorite(false);
    }
  }, [id, setIsFavorite]);

  const fetchRecipe = async (ID) => {
    const currentRouteName = pathname.split('/')[1];
    if (currentRouteName === 'comidas') {
      const responseMeals = await fetchMealRecipeDetailsById(ID);
      setRecipe(responseMeals[0]);
    }
    if (currentRouteName === 'bebidas') {
      const responseDrinks = await fetchDrinksRecipeDetailsById(ID);
      setRecipe(responseDrinks[0]);
    }
  };
  const handleFavoriteButton = () => {
    const currentRouteName = pathname.split('/')[1];
    if (isFavorite) {
      setFavoriteStorage((prevState) => {
        const newState = prevState.filter((favorite) => favorite.id !== recipeID);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newState));
        setIsFavorite(false);
        return newState;
      });
    } else {
      const recipeObj = currentRouteName === 'comidas' ? (
        {
          id: recipeID,
          type: 'comida',
          area: recipe.strArea ? recipe.strArea : '',
          category: recipe.strCategory ? recipe.strCategory : '',
          alcoholicOrNot: '',
          name: recipe.strMeal,
          image: recipe.strMealThumb,
        }
      ) : (
        {
          id: recipeID,
          type: 'bebidas',
          area: '',
          category: recipe.strCategory ? recipe.strCategory : '',
          alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
          name: recipe.strDrink,
          image: recipe.strDrinkThumb,
        }
      );

      const newState = [...favoriteStorage, recipeObj];
      setFavoriteStorage(newState);
      setIsFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newState));
    }
  };

  useEffect(() => {
    fetchRecipe(recipeID);
  }, [recipeID]);

  return (
    <button
      type="button"
      className="btn"
      data-testid="favorite-btn"
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      onClick={ handleFavoriteButton }
    >
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Botão de favoritos"
      />
    </button>
  );
}

export default ButtonFavorite;

ButtonFavorite.propTypes = {
  props: PropTypes.shape({
    match: PropTypes.shape({
      params: PropTypes.shape().isRequired,
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};
