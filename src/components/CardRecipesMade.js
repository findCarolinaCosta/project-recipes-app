import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import ButtonShare from './ButtonShare';

function CardRecipesMade() {
  const { doneRecipes,
    setDoneRecipes, doneRecipesFilteredByName } = useContext(Context);

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

  const gettingRecipeTags = (recipe, index) => (
    recipe.tags.length > 0 ? recipe.tags.map((tag) => (
      <p
        key={ tag }
        data-testid={ `${index}-${tag}-horizontal-tag` }
        className="card-title bg-transparent m-auto"
      >
        {tag}
      </p>
    )) : null);

  return (
    <section className="d-flex flex-wrap justify-content-center gap-5 p-3">
      {doneRecipes && verifyListRecipes().map((recipe, index) => (
        recipe.type === 'comida' ? (
          <section
            key={ recipe.id }
            className="card flex-row shadow-lg bg-body rounded w-full"
          >
            <Link
              to={ `/comidas/${recipe.id}` }
              style={ { width: '40vw' } }
            >
              <img
                className="card-img-top h-full"
                src={ recipe.image }
                alt="colocar-alt-da-img"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div className="card-body bg-white">
              <div className="bg-white flex justify-between gap-6">
                <p
                  className="card-title bg-transparent
                   text-muted m-auto text-xs align-middle"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.area} - ${recipe.category}`}
                </p>
                <ButtonShare />
              </div>
              <Link to={ `/comidas/${recipe.id}` }>
                <h1
                  className="card-title bg-transparent m-auto"
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </h1>
              </Link>
              <p
                className="card-title bg-transparent m-auto"
                data-testid={ `${index}-horizontal-done-date` }
              >
                {`Feito em: ${recipe.doneDate}`}
              </p>
              {gettingRecipeTags(recipe, index)}
            </div>
          </section>
        ) : (
          <section
            key={ recipe.id }
            className="card flex-row shadow-lg bg-body rounded w-full"
          >
            <Link
              to={ `/bebidas/${recipe.id}` }
              style={ { width: '40vw' } }
            >
              <img
                src={ recipe.image }
                alt="colocar-alt-da-img"
                data-testid={ `${index}-horizontal-image` }
                className="card-img-top"
              />
            </Link>
            <div className="card-body bg-white">
              <div className="bg-white flex justify-between gap-6">
                <p
                  className="card-title bg-transparent
                      text-muted m-auto text-xs align-middle"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.alcoholicOrNot}
                </p>
                <ButtonShare />
              </div>
              <Link to={ `/bebidas/${recipe.id}` }>
                <h1
                  className="card-title bg-transparent m-auto"
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </h1>
              </Link>
              <p
                className="card-title bg-transparent m-auto"
                data-testid={ `${index}-horizontal-done-date` }
              >
                {`Feito em: ${recipe.doneDate}`}
              </p>
              {gettingRecipeTags(recipe, index)}
            </div>
          </section>
        )
      ))}
    </section>
  );
}

export default CardRecipesMade;
