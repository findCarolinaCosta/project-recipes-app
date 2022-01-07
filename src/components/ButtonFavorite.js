import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../context/Context';
import fetchMealRecipeDetailsById from '../services/fetchMealRecipeDetailsById';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function ButtonFavorite(props) {
  const { props: { match: { params: { id } } } } = props;
  const recipeID = id;
  const { isFavorite, setIsFavorite,
    favoriteStorage, setFavoriteStorage,
    recipe, setRecipe } = useContext(Context);

  const fetchRecipe = async (ID) => {
    const response = await fetchMealRecipeDetailsById(ID);
    setRecipe(response[0]);
  };
  const handleFavoriteButton = () => {
    if (isFavorite) {
      setFavoriteStorage((prevState) => {
        const newState = prevState.filter((favorite) => favorite.id !== recipeID);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newState));
        setIsFavorite(false);
        return newState;
      });
    } else {
      const recipeObj = {
        id: recipeID,
        type: 'comida',
        area: recipe.strArea ? recipe.strArea : '',
        category: recipe.strCategory ? recipe.strCategory : '',
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe,
      };

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
      onClick={ handleFavoriteButton }
    >
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        alt="Botão de compartilhamento"
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
  }).isRequired,
};
