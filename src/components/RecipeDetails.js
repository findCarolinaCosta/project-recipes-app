import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../context/Context';
import fetchMealRecipeDetailsById from '../services/fetchMealRecipeDetailsById';
import fetchDrinkRecipeDetailsById from '../services/fetchDrinkRecipeDetailsById';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails(props) {
  const { setSharedProps } = useContext(Context);
  const { match: { params: { id } }, location: { pathname } } = props;
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState('teste');

  const makeIngredientsList = () => {
    const keys = Object.keys(recipe);
    console.log(keys);
    return keys;
    // recipe.map((recipeAttribute, index) => {
    //   if (recipeAttribute === `strIngredient${index + 1}`
    //   && )
    // });
  };

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
    setIngredients(makeIngredientsList());
  }, []);

  if (pathname.includes('comidas')) {
    if (recipe) {
      makeIngredientsList(recipe);
    }
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
              src={ recipe.strMealThumb }
              alt={ `Foto da receita
                ${recipe.strMeal}, que contém ${recipe.strIngredient1} 
                e ${recipe.strIngredient2} entre outros ingredientes.` }
            />
          </div>

          <div className="row d-flex justify-content-between">
            <div className="col-6">
              <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
            </div>
            <div className="col-3">
              <img
                data-testid="share-btn"
                src={ shareIcon }
                alt={ `Ícone para compartilhar a receita ${recipe.strMeal}` }
              />
            </div>
            <div className="col-3">
              <img
                data-testid="favorite-btn"
                src={ blackHeartIcon }
                alt={ `Ícone em formato de coração para incluir receita 
                ${recipe.strMeal} na lista de favoritas` }
              />
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-12">
            <h4>{ recipe.strCategory }</h4>
          </div>
        </div>

      </div>
    );
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};

export default RecipeDetails;
