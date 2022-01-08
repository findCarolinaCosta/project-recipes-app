import React, { useContext } from 'react';
import { Context } from '../context/Context';
import ButtonFavorite from './ButtonFavorite';
import ButtonShare from './ButtonShare';

function DrinksDetails(Props) {
  const { inProgress } = useContext(Context);
  const { handleClick } = Props;
  return (
    <>
      <nav className="in-progress-butons">
        <ButtonShare props={ Props.Props } />
        <ButtonFavorite props={ Props.Props } />
      </nav>
      <div>
        <button
          type="button"
          className="fixed-bottom"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      </div>

    </>
  );
}

export default DrinksDetails;
