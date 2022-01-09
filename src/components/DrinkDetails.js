import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import fetchDrinkRecipeDetailsById from '../services/fetchDrinkRecipeDetailsById';
import fetchMealRecipeDetailsById from '../services/fetchMealRecipeDetailsById';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinkDetails({ props }) {
  const { setSharedProps } = useContext(Context);
  const { match: { params: { id } }, location: { pathname } } = props;
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState();

  useEffect(() => {
    if (pathname.includes('comidas')) {
      fetchMealRecipeDetailsById(id).then((response) => setRecipe(response[0]));
    }
    if (pathname.includes('bebidas')) {
      fetchDrinkRecipeDetailsById(id).then((response) => setRecipe(response[0]));
    }
    setSharedProps(props);
  }, [props, setSharedProps, id, pathname]);

  useEffect(() => {
    const makeIngredientsList = () => {
      const MAX_INGREDIENTS_NUMBER = 20;
      const ingredientsList = [];
      for (let index = 1; index <= MAX_INGREDIENTS_NUMBER; index += 1) {
        const ingredientName = recipe[`strIngredient${index}`];
        const ingredientMeasure = recipe[`strMeasure${index}`];
        const objectToPush = { ingredientName, ingredientMeasure };
        if (ingredientName) ingredientsList.push(objectToPush);
      }
      return ingredientsList;
    };
    setIngredients(makeIngredientsList());
  }, [recipe]);

  return (
    <div
      className="container-fluid"
      style={ { height: '100vh', width: '100vw' } }
    >
      <div className="row d-flex w-100">

        <div className="col-12 d-flex w-100">
          <img
            data-testid="recipe-photo"
            className="img-fluid"
            src={ recipe.strDrinkThumb }
            alt={ `Foto da receita
                ${recipe.strDrink}, que contém ${recipe.strIngredient1} 
                e ${recipe.strIngredient2} entre outros ingredientes.` }
          />
        </div>

        <div className="row d-flex justify-content-between">
          <div className="col-6">
            <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
          </div>
          <div className="col-3">
            <img
              data-testid="share-btn"
              src={ shareIcon }
              alt={ `Ícone para compartilhar a receita ${recipe.strDrink}` }
            />
          </div>
          <div className="col-3">
            <img
              data-testid="favorite-btn"
              src={ blackHeartIcon }
              alt={ `Ícone em formato de coração para incluir receita 
                ${recipe.strDrink} na lista de favoritas` }
            />
          </div>
        </div>

      </div>

      <div className="row">
        <div className="col-12">
          <h3>{ recipe.strCategory }</h3>
          <h5 data-testid="recipe-category">{ recipe.strAlcoholic }</h5>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h1>Ingredients</h1>
        </div>
        {ingredients
          && (
            <div className="col-12">
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                    key={ `${ingredient.ingredientName}${index}` }
                  >
                    {`${ingredient.ingredientName} - ${ingredient.ingredientMeasure}`}
                  </li>
                ))}
              </ul>
            </div>)}
      </div>

      <div className="row">
        <div className="col-12">
          <h1>Instructions</h1>
        </div>
        <div>
          <p data-testid="instructions">{ recipe.strInstructions }</p>
        </div>
      </div>

      <div className="row d-flex w-100">
        <div className="d-flex flex-wrap justify-content-center">
          <Link
            className="custom-card col-sm-6 col-md-3"
            style={ { width: '40vw' } }
            data-testid="0-recomendation-card"
            key="teste"
            to={ `/comidas/${recipe.idMeal}` }
          >
            <img
              className="img-thumbnail"
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              data-testid="card-img"
              width="100px"
            />
            <h4 className="card-title" data-testid="card-name">
              {recipe.strMeal}
            </h4>
          </Link>
        </div>
      </div>

      <div className="row">
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>
      </div>

    </div>
  );
}

DrinkDetails.propTypes = {
  props: PropTypes.shape().isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinkDetails;
