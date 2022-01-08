import fetchDrinksRecipeDetailsById from '../services/fetchDrinksRecipeDetailsById';
import fetchMealRecipeDetailsById from '../services/fetchMealRecipeDetailsById';

export default async function getRecipe(ID, currentRouteName) {
  if (currentRouteName === 'comidas') {
    const responseMeals = await fetchMealRecipeDetailsById(ID);
    return responseMeals;
  }
  if (currentRouteName === 'bebidas') {
    const responseDrinks = await fetchDrinksRecipeDetailsById(ID);
    return responseDrinks;
  }
}
