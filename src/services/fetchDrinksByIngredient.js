const fetchDrinksByIngredient = async (receivedIngredient) => {
  const API_URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${receivedIngredient}`;
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  return jsonResponse.drinks;
};

export default fetchDrinksByIngredient;
