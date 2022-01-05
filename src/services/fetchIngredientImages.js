const fetchIngredientImages = async ({ strIngredient }) => {
  const API_URL = `https://www.themealdb.com/images/ingredients/${strIngredient}.png`;
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  return jsonResponse;
};

export default fetchIngredientImages;
