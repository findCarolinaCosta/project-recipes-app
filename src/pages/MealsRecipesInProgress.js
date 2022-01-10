import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchMealRecipeDetailsById from '../services/fetchMealRecipeDetailsById';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import checkTarget from '../helpers/checkTarget';
import { Context } from '../context/Context';

const setStorage = (listIngredients, id) => {
  const inProgressObj = localStorage.getItem('inProgressRecipes')
    ? JSON.parse(localStorage.getItem('inProgressRecipes')) : {};
  const cocktails = Object.keys(inProgressObj).includes('cocktails')
    ? inProgressObj.cocktails : {};
  const inProgress = localStorage.getItem('inProgressRecipes')
    ? JSON.parse(localStorage.getItem('inProgressRecipes'))
    : {
      meals: {
        [id]: [],
      },
      cocktails,
    };
  inProgress.meals[id] = listIngredients;
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
};

const setIngredientsInitial = (id) => {
  if (localStorage.getItem('inProgressRecipes')) {
    const inProgressObj = JSON.parse(localStorage.getItem('inProgressRecipes')).meals;
    const listIngredients = Object.keys(inProgressObj).includes(id)
      ? inProgressObj[id] : [];
    return listIngredients;
  }
  return [];
};

export default function MealsRecipesInProgress({ match: { params } }) {
  const recipeID = params.id;
  const timeClipboard = 3000;
  const [checkedList, setCheckedList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [ingredientsList, setIngredientsList] = useState(setIngredientsInitial(recipeID));
  const [isClipboard, setIsClipboard] = useState(false);
  const [favoriteStorage, setFavoriteStorage] = useState(localStorage
    .getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : []);
  const [isFavorite, setIsFavorite] = useState(favoriteStorage
    .some((favorite) => favorite.id === recipeID));
  const { recipesDone, setRecipesDone, setIsRecipesDone } = useContext(Context);

  const fetchRecipe = async (ID) => {
    const response = await fetchMealRecipeDetailsById(ID);
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
    setCheckedList(ingredientSetting.map((ingredient) => (
      ingredientsList.includes(ingredient)
    )));
  };

  const toggleChecked = (index) => {
    setCheckedList((prev) => {
      const newList = [...prev];
      newList[index] = !newList[index];
      const IngredientsList = ingredients.filter((ingredient, innerIndex) => (
        newList[innerIndex]
      ));
      setIngredientsList(IngredientsList);
      setStorage(IngredientsList, recipeID);
      return newList;
    });
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
      console.log(recipe);
      const recipeObj = {
        id: recipeID,
        type: 'comida',
        area: recipe.strArea ? recipe.strArea : '',
        category: recipe.strCategory ? recipe.strCategory : '',
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };

      const newState = [...favoriteStorage, recipeObj];
      setFavoriteStorage(newState);
      setIsFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newState));
    }
  };

  const handleClick = () => {
    setRecipesDone([...recipesDone, recipe]);
    setIsRecipesDone(true);
  };

  useEffect(() => {
    fetchRecipe(recipeID);
  }, [fetchRecipe, recipeID]);
  return (
    <div className="meal-in-progress">
      <img
        className="meal-photo"
        src={ recipe.strMealThumb }
        alt="Foto do prato"
        data-testid="recipe-photo"
      />
      <h4
        data-testid="recipe-title"
      >
        { recipe.strMeal }
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
          onClick={ () => {
            navigator.clipboard.writeText(window.location
              .href.replace('/in-progress', '')).then(() => {
              setIsClipboard(true);
              setTimeout(() => { setIsClipboard(false); }, timeClipboard);
            });
          } }
        >
          {isClipboard ? 'Link copiado!' : (<img
            src={ shareIcon }
            alt="Botão de compartilhamento"
            data-testid="share-btn"
          />)}
        </button>
        <button
          type="button"
          className="btn"
          onClick={ handleFavoriteButton }
        >
          <img
            data-testid="favorite-btn"
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
                className={ checkTarget(checkedList[index]) }
                data-testid={ `${index}-ingredient-step` }
              >
                <label htmlFor={ ingredient } className="form-check-label">
                  <input
                    name="check"
                    className="form-check-input"
                    id={ ingredients }
                    checked={ checkedList[index] }
                    onClick={ () => toggleChecked(index) }
                    type="checkbox"
                  />
                  <p
                    className="ingredients-label"
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
      <Link to="/receitas-feitas">
        <button
          type="button"
          className="btn btn-outline-danger btn-lg"
          data-testid="finish-recipe-btn"
          disabled={ !checkedList.every((item) => item) }
          onClick={ handleClick }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

MealsRecipesInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired,
  }).isRequired,
};
