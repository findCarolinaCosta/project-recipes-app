import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchDrinkRecipeDetailsById from '../services/fetchDrinkRecipeDetailsById';
import checkTarget from '../helpers/checkTarget';
import { Context } from '../context/Context';
import ButtonShare from '../components/ButtonShare';
import ButtonFavorite from '../components/ButtonFavorite';

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

export default function DrinksRecipesInProgress(props) {
  const { match: { params } } = props;
  const recipeID = params.id;
  const [checkedList, setCheckedList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [ingredientsList, setIngredientsList] = useState(setIngredientsInitial(recipeID));
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

  const handleClick = () => {
    setIsRecipesDone(true);
    const data = new Date();
    const storageList = JSON.parse(localStorage.getItem('doneRecipes'));
    localStorage.setItem('doneRecipes',
      JSON.stringify([...storageList, {
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
    return storageList === null && localStorage.setItem('doneRecipes',
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
    <div className="container-fluid p-0 w-screen h-screen">
      <section>
        <img
          className="w-full"
          src={ recipe.strDrinkThumb }
          alt="Foto do drink"
          data-testid="recipe-photo"
        />
      </section>
      <section className="p-3">
        <div className="flex justify-between pr-4 pt-3">
          <h4
            className="self-center m-0"
            data-testid="recipe-title"
          >
            { recipe.strDrink }
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

DrinksRecipesInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape(),
  }).isRequired,
};
