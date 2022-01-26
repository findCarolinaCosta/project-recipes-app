import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import shareIcon from '../images/shareIcon.svg';

function CardRecipesMade() {
  const { doneRecipes,
    setDoneRecipes, doneRecipesFilteredByName } = useContext(Context);
  const [wasCopied, setWasCopied] = useState(false);
  const timeClipboard = 3000;

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  const verifyListRecipes = () => {
    switch (doneRecipesFilteredByName) {
    case 'Drinks':
      return doneRecipes.filter((item) => item.type === 'bebida');
    case 'Foods':
      return doneRecipes.filter((item) => item.type === 'comida');
    default:
      return doneRecipes;
    }
  };

  const handleClickCopy = (route, id) => {
    navigator.clipboard.writeText(`http://localhost:3000/${route}/${id}`).then(() => {
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
      {doneRecipes && verifyListRecipes().map((recipe, index) => (
        recipe.type === 'comida' ? (
          <section
            key={ recipe.id }
            className="card shadow-lg bg-body rounded"
          >
            <Link to={ `/comidas/${recipe.id}` }>
              <img
                className="card-img-top"
                src={ recipe.image }
                alt="colocar-alt-da-img"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <p
              className="card-title bg-transparent"
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.area} - ${recipe.category}`}
            </p>
            <Link to={ `/comidas/${recipe.id}` }>
              <h1
                className="card-title bg-transparent"
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h1>
            </Link>
            <p
              className="card-title bg-transparent"
              data-testid={ `${index}-horizontal-done-date` }
            >
              {`Receita feita em: ${recipe.doneDate}`}
            </p>
            {gettingRecipeTags(recipe, index)}
            <button
              className="card-title bg-transparent"
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => handleClickCopy('comidas', recipe.id) }
            >
              {wasCopied ? 'Link copiado!'
                : <img src={ shareIcon } alt="Botão de compartilhamento" />}
            </button>
          </section>
        ) : (
          <section
            key={ recipe.id }
            className="card shadow-lg bg-body rounded"
          >
            <Link to={ `/bebidas/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt="colocar-alt-da-img"
                data-testid={ `${index}-horizontal-image` }
                className="card-img-top"
              />
            </Link>
            <p
              className="card-title bg-transparent"
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.alcoholicOrNot}
            </p>
            <Link to={ `/bebidas/${recipe.id}` }>
              <h1
                className="card-title bg-transparent"
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h1>
            </Link>
            <p
              className="card-title bg-transparent"
              data-testid={ `${index}-horizontal-done-date` }
            >
              {`Receita feita em: ${recipe.doneDate}`}
            </p>
            {gettingRecipeTags(recipe, index)}
            <button
              type="button"
              className="card-title bg-transparent"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ () => handleClickCopy('bebidas', recipe.id) }
            >
              {wasCopied ? 'Link copiado!'
                : <img src={ shareIcon } alt="Botão de compartilhamento" />}
            </button>
          </section>
        )
      ))}
    </div>
  );
}

export default CardRecipesMade;
