export default function getRecipeObj(currentRouteName, recipeID, recipe) {
  const recipeItem = recipe[0];
  const recipeObj = currentRouteName === 'comidas' ? (
    {
      id: recipeID,
      type: 'comida',
      area: recipeItem.strArea,
      category: recipeItem.strCategory,
      alcoholicOrNot: '',
      name: recipeItem.strMeal,
      image: recipeItem.strMealThumb,
    }
  ) : (
    {
      id: recipeID,
      type: 'bebida',
      area: '',
      category: recipeItem.strCategory ? recipeItem.strCategory : '',
      alcoholicOrNot: recipeItem.strAlcoholic ? recipeItem.strAlcoholic : '',
      name: recipeItem.strDrink,
      image: recipeItem.strDrinkThumb,
    }
  );
  console.log(currentRouteName);
  return recipeObj;
}
