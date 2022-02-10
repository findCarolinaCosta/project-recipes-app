import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../context/Context';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import getRecipe from '../helpers/getRecipe';
import getRecipeObj from '../helpers/getRecipeObj';

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
      const newState = [
        ...favoriteStorage,
        getRecipeObj(currentRouteName, recipeID, recipe),
      ];
      setFavoriteStorage(newState);
      setIsFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newState));
    }
  };

  useEffect(() => {
    const setRecipes = async () => {
      const currentRouteName = pathname.split('/')[1];
      return currentRouteName === 'comidas'
        ? setRecipe(await getRecipe(recipeID, currentRouteName))
        : setRecipe(await getRecipe(recipeID, currentRouteName));
    };
    setRecipes();
  }, [recipeID, pathname, setRecipe]);

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      onClick={ handleFavoriteButton }
      className="ml-4 h-4/6 w-10/12"
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
