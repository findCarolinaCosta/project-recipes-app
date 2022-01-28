import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';

function ButtonShare() {
  const [wasCopied, setWasCopied] = useState(false);
  const timeClipboard = 3000;

  return (
    <button
      type="button"
      className="align-middle"
      data-testid="share-btn"
      onClick={ () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          setWasCopied(true);
          setTimeout(() => { setWasCopied(false); }, timeClipboard);
        });
      } }
    >
      {wasCopied ? 'Link copiado!'
        : <img
          src={ shareIcon }
          alt="Botão de compartilhamento"
          className="bg-transparent"
        />}
    </button>
  );
}

export default ButtonShare;
