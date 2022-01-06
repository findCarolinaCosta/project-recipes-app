import React, { useContext } from 'react';
import { Context } from '../context/Context';

export default function MealsRecipesInProgress() {
  const { sharedProps } = useContext(Context);
  console.log(sharedProps);
  const recipeID = 1;
  return <div>Página em construção</div>;
}
