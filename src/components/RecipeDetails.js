import React, { useContext } from 'react';
import { Context } from '../context/Context';

function RecipeDetails(props) {
  console.log(props);
  const { meals, drinks } = useContext(Context);
  console.log(meals);
  console.log(drinks);
  return (
    <div className="container-sm">
      <h1>Construindo detalhes da receita</h1>
    </div>
  );
}

export default RecipeDetails;
