const fetchMealRecipeDetailsById = async (receivedId) => {
  try {
    const API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${receivedId}`;
    const response = await fetch(API_URL);
    const { meals } = await response.json();
    return meals;
  } catch (e) {
    console.log(e);
  }
};

export default fetchMealRecipeDetailsById;
