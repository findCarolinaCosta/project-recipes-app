const makeIngredientsList = (receivedRecipe) => {
  const MAX_INGREDIENTS_NUMBER = 20;
  const ingredientsList = [];
  for (let index = 1; index <= MAX_INGREDIENTS_NUMBER; index += 1) {
    // index inicial precisou ser 1 dada a característica do atributo strIngredient,
    // que foi nomeado com o seu número no final, sendo de 1 a 20.
    const ingredientName = receivedRecipe[`strIngredient${index}`];
    const ingredientMeasure = receivedRecipe[`strMeasure${index}`];
    const objectToPush = { ingredientName, ingredientMeasure };
    if (ingredientName) ingredientsList.push(objectToPush);
  }
  return ingredientsList;
};

export default makeIngredientsList;
