import React, { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

// card dinâmico das receitas feitas
function CardRecipesMade() {
  // pegar do contexto as feitas/finalizadas
  // para que só assim ser dinâmico
  // pode ser modificado
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [wasCopied, setWasCopied] = useState(false);
  const timeClipboard = 3000;

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    console.log(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setWasCopied(true);
      setTimeout(() => { setWasCopied(false); }, timeClipboard);
    });
  };

  const gettingRecipeTags = (recipe, index) => (
    recipe.tags.length > 0 ? recipe.tags.map((tag) => (
      <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
        {tag}
      </p>
    )) : null);

  return (
    <div>
      {doneRecipes && doneRecipes.map((recipe, index) => (
        recipe.type === 'comida' ? (
          <div key={ recipe.id }>
            <img
              src={ recipe.image }
              alt="colocar-alt-da-img"
              data-testid={ `${index}-horizontal-image` }
              className="img-thumbnail"
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.area} - ${recipe.category}`}
            </p>
            <h1
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </h1>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {`Receita feita em: ${recipe.doneDate}`}
            </p>
            {gettingRecipeTags(recipe, index)}
            <button
              type="button"
              className="btn"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ handleClick }
            >
              {wasCopied ? 'Link copiado!'
                : <img src={ shareIcon } alt="Botão de compartilhamento" />}
            </button>
          </div>
        ) : (
          <div key={ recipe.id }>
            <img
              src={ recipe.image }
              alt="colocar-alt-da-img"
              data-testid={ `${index}-horizontal-image` }
              className="img-thumbnail"
            />
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.alcoholicOrNot}
            </p>
            <h1
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </h1>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {`Receita feita em: ${recipe.doneDate}`}
            </p>
            {gettingRecipeTags(recipe, index)}
            <button
              type="button"
              className="btn"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ handleClick }
            >
              {wasCopied ? 'Link copiado!'
                : <img src={ shareIcon } alt="Botão de compartilhamento" />}
            </button>
          </div>
        )
      ))}
    </div>
  );
}

export default CardRecipesMade;
