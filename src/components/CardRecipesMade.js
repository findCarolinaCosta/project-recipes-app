import React from 'react';
import shareImg from '../images/shareIcon.svg';

// card dinâmico das receitas feitas
function CardRecipesMade() {
  // pegar do contexto as feitas/finalizadas
  // para que só assim ser dinâmico
  // pode ser modificado
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <div>
      {doneRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            src={ recipe.strMealThumb }
            alt="colocar-alt-da-img"
            data-testid={ `${index}-horizontal-image` }
            className="img-thumbnail"
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {recipe.strCategory}
          </p>
          <h1
            data-testid={ `${index}-horizontal-name` }
          >
            {recipe.strMeal}
          </h1>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {`Receita feita em: ${recipe.doneDate}`}
          </p>
          {recipe.strTags.length > 0 ? recipe.strTags.forEach((tag) => (
            <p data-testid={ `${index}-${tag}-horizontal-tag` }>
              {recipe.strTags[0]}
              {recipe.strTags[1]}
            </p>
          )) : null}
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareImg }
            alt="share-icon"
            width="20px"
          />
        </div>
      ))}
    </div>
  );
}

export default CardRecipesMade;
