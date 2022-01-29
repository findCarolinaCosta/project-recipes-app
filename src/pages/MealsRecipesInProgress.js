import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchMealRecipeDetailsById from '../services/fetchMealRecipeDetailsById';
import checkTarget from '../helpers/checkTarget';
import { Context } from '../context/Context';
import ButtonShare from '../components/ButtonShare';
import ButtonFavorite from '../components/ButtonFavorite';

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

export default function MealsRecipesInProgress(props) {
  const { match: { params } } = props;
  const recipeID = params.id;
  const [checkedList, setCheckedList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [ingredientsList, setIngredientsList] = useState(setIngredientsInitial(recipeID));
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

  const handleClick = () => {
    setRecipesDone([...recipesDone, recipe]);
    setIsRecipesDone(true);
    const data = new Date();
    const storageList = JSON.parse(localStorage.getItem('doneRecipes'));
    localStorage.setItem('doneRecipes',
      JSON.stringify([...storageList, {
        id: recipe.idMeal,
        type: 'comida',
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
        doneDate: `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`,
        tags: [recipe.strTags],
      }]));
    return storageList === null && localStorage.setItem('doneRecipes',
      JSON.stringify([{
        id: recipe.idMeal,
        type: 'comida',
        area: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
        doneDate: `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`,
        tags: [recipe.strTags],
      }]));
  };
  useEffect(() => {
    fetchRecipe(recipeID);
  }, [recipeID]);
  return (
    <div className="container-fluid p-0 w-screen h-screen">
      <img
        className="w-full"
        src={ recipe.strMealThumb }
        alt="Foto do prato"
        data-testid="recipe-photo"
      />
      <section className="p-3">
        <div className="flex justify-between pr-4 pt-3">
          <h4
            data-testid="recipe-title"
          >
            { recipe.strMeal }
          </h4>
          <section className="in-progress-butons align-middle">
            <ButtonShare />
            <ButtonFavorite props={ props } />
          </section>
        </div>
        <h5
          data-testid="recipe-category"
          className="text-muted"
        >
          { recipe.strCategory }
        </h5>
        <div>
          <ul className="bg-neutral rounded-md justify-start p-3 mb-3">
            {
              ingredients.map((ingredient, index) => (
                <li
                  key={ ingredient }
                  className={ `${checkTarget(checkedList[index])}
                  p-1 pl-4 bg-neutral ml-3 rounded-md` }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <label
                    htmlFor={ ingredient }
                    className="form-check-label bg-transparent"
                  >
                    <input
                      name="check"
                      className="form-check-input bg-transparent"
                      id={ ingredient }
                      checked={ checkedList[index] }
                      onClick={ () => toggleChecked(index) }
                      type="checkbox"
                    />
                    <p
                      className="ingredients-label bg-transparent m-0"
                    >
                      { ingredient }
                    </p>
                  </label>
                </li>
              ))
            }
          </ul>
        </div>
        <section>
          <h1>Instructions</h1>
          <p
            data-testid="instructions"
            className="bg-neutral rounded-md p-4 mb-7"
          >
            { recipe.strInstructions }
          </p>
        </section>
        <section className="text-center">
          <Link to="/receitas-feitas">
            <button
              type="button"
              className="style__btn-done"
              data-testid="finish-recipe-btn"
              disabled={ !checkedList.every((item) => item) }
              onClick={ handleClick }
            >
              Finalizar Receita
            </button>
          </Link>
        </section>
      </section>
    </div>
  );
}

MealsRecipesInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired,
  }).isRequired,
};
