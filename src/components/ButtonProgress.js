import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Context } from '../context/Context';

function ButtonProgress({ props }) {
  const { inProgress, isRecipesDone,
    setRecipeInProgress, recipesInProgress } = useContext(Context);
  const { match: { params: { id } }, location: { pathname }, history } = props;

  const handleClick = () => {
    const currentRouteName = pathname.split('/')[1];
    const gettingRoute = currentRouteName === 'comidas' ? 'meals' : 'cocktails';
    const currentRecipeId = pathname.split('/')[2];
    setRecipeInProgress((state) => ({ ...state,
      [gettingRoute]: { [currentRecipeId]: [] } }));

    localStorage.setItem('inProgressRecipes', JSON.stringify(({ ...recipesInProgress,
      [gettingRoute]: { [currentRecipeId]: [] } })));

    history.push(`/${currentRouteName}/${id}/in-progress`);
  };
  return (
    <button
      type="button"
      className={ `fixed-bottom ${isRecipesDone && 'invisible'} style__btn` }
      data-testid="start-recipe-btn"
      onClick={ handleClick }
    >
      {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );
}

ButtonProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.string,
  }).isRequired,
  props: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  }).isRequired,
};

export default ButtonProgress;
