export default function getRecipeObj(currentRouteName, recipeID, recipe) {
  const recipeObj = currentRouteName === 'comidas' ? (
    {
      id: recipeID,
      type: 'comida',
      area: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    }
  ) : (
    {
      id: recipeID,
      type: 'bebidas',
      area: '',
      category: recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    }
  );
  return recipeObj;
}
