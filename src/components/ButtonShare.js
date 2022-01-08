import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function ButtonShare() {
  const [wasCopied, setWasCopied] = useState(false);

  return (
    <>
      <button
        type="button"
        className="btn"
        data-testid="share-btn"
        onClick={ () => {
          navigator.clipboard.writeText(window.location.href);
          setWasCopied(true);
        } }
      >
        <img src={ shareIcon } alt="Botão de compartilhamento" />
      </button>
      {wasCopied && <p>Link copiado!</p> }

    </>
  );
}

export default ButtonShare;
