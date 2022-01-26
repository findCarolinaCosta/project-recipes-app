import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchDrinkRecipeDetailsById from '../services/fetchDrinkRecipeDetailsById';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import checkTarget from '../helpers/checkTarget';
import { Context } from '../context/Context';

const setStorage = (listIngredients, id) => {
  const inProgressObj = localStorage.getItem('inProgressRecipes')
    ? JSON.parse(localStorage.getItem('inProgressRecipes')) : {};
  const meals = Object.keys(inProgressObj).includes('meals')
    ? inProgressObj.meals : {};
  const inProgress = localStorage.getItem('inProgressRecipes')
    ? JSON.parse(localStorage.getItem('inProgressRecipes'))
    : {
      cocktails: {
        [id]: [],
      },
      meals,
    };
  inProgress.cocktails[id] = listIngredients;
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
};

const setIngredientsInitial = (id) => {
  if (localStorage.getItem('inProgressRecipes')) {
    const inProgressObj = JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails;
    const listIngredients = Object.keys(inProgressObj).includes(id)
      ? inProgressObj[id] : [];
    return listIngredients;
  }
  return [];
};

export default function DrinksRecipesInProgress({ match: { params } }) {
  const recipeID = params.id;
  const timeClipboard = 3000;
  const [checkedList, setCheckedList] = useState([]);
  const [isClipboard, setIsClipboard] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [ingredientsList, setIngredientsList] = useState(setIngredientsInitial(recipeID));
  const [favoriteStorage, setFavoriteStorage] = useState(localStorage
    .getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : []);
  const [isFavorite, setIsFavorite] = useState(favoriteStorage
    .some((favorite) => favorite.id === recipeID));
  const { setIsRecipesDone } = useContext(Context);

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
      const recipeObj = {
        id: recipeID,
        type: 'bebida',
        area: recipe.strArea ? recipe.strArea : '',
        category: recipe.strCategory ? recipe.strCategory : '',
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };

      const newState = [...favoriteStorage, recipeObj];
      setFavoriteStorage(newState);
      setIsFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newState));
    }
  };

  const handleClick = () => {
    setIsRecipesDone(true);
    const data = new Date();
    localStorage.setItem('doneRecipes',
      JSON.stringify([{
        id: recipe.idDrink,
        type: 'bebida',
        area: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
        doneDate: `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`,
        tags: [],
      }]));
  };

  useEffect(() => {
    fetchRecipe(recipeID);
  }, [recipeID]);

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
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="Botão de compartilhamento"
            data-testid="favorite-btn"
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
                    id={ ingredient }
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

DrinksRecipesInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.any.isRequired,
  }).isRequired,
};
