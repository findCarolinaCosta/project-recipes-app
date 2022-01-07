import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchDrinkRecipeDetailsById from '../services/fetchDrinkRecipeDetailsById';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function DrinksRecipesInProgress({ match: { params }, history }) {
  const recipeID = params.id;

  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [favoriteStorage, setFavoriteStorage] = useState(localStorage
    .getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : []);
  const [isFavorite, setIsFavorite] = useState(favoriteStorage
    .some((favorite) => favorite.id === recipeID));
  const fetchRecipe = async (ID) => {
    const response = await fetchDrinkRecipeDetailsById(ID);
    setRecipe(response[0]);
    const ingredientMensure = Object.entries(response[0])
      .filter(([key, value]) => key.includes('strMeasure') && value !== '');
    const ingredientSetting = Object.entries(response[0])
      .filter(([key, value]) => key.includes('strIngredient')
      && value && value.lenght !== 0)
      .reduce((prev, curr, index) => (
        [...prev, `${curr[1]} - ${ingredientMensure[index][1]}`]
      ), []);
    setIngredients(ingredientSetting);
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
        name: recipe.strDrink,
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
  console.log(recipe);
  return (
    <div className="drinks-in-progress">
      <img
        className="drink-photo"
        src={ recipe.strDrinkThumb }
        alt="Foto do drink"
        data-testid="recipe-photo"
      />
      <h4
        data-testid="recipe-title"
      >
        { recipe.strDrink }
      </h4>
      <h5
        data-testid="recipe-category"
      >
        { recipe.strCategory }
      </h5>
      <nav className="in-progress-butons mb-36">
        <button
          type="button"
          className="btn"
          onClick={ () => { navigator.clipboard.writeText(history.location.pathname); } }
        >
          <img
            src={ shareIcon }
            alt="Botão de compartilhamento"
            data-testid="share-btn"
          />
        </button>
        <button
          type="button"
          className="btn"
          onClick={ handleFavoriteButton }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="Botão de compartilhamento"
          />
        </button>
      </nav>
      <div>
        <ul>
          {
            ingredients.map((ingredient, index) => (
              <li
                key={ ingredient }
                className="listIngredients"
              >
                <label htmlFor={ ingredient } className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={ ingredient }
                  />
                  <p
                    className="ingredients-label"
                    data-testid={ `${index}-ingredient-step` }
                  >
                    { ingredient }
                  </p>
                </label>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="row col-md-4 card-box text-center">
        <section>
          <p
            data-testid="instructions"
            className="paragraph-recipe-instructions"
          >
            { recipe.strInstructions }
          </p>
        </section>
      </div>
    </div>
  );
}

DrinksRecipesInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
