import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function ButtonShare() {
  return (
    <button
      type="button"
      className="btn"
      data-testid="share-btn"
      onClick={ () => { navigator.clipboard.writeText(window.location.href); } }
    >
      <img src={ shareIcon } alt="Botão de compartilhamento" />
    </button>
  );
}

export default ButtonShare;
