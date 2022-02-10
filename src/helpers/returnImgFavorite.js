import React from 'react';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function returnImg(index) {
  return (
    <img
      className="h-full w-full bg-transparent"
      data-testid={ `${index}-horizontal-favorite-btn` }
      src={ blackHeartIcon }
      alt="Botão de compartilhamento"
    />
  );
}
