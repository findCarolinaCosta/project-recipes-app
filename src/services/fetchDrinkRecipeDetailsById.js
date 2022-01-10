const fetchDrinkRecipeDetailsById = async (receivedId) => {
  try {
    const API_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${receivedId}`;
    const response = await fetch(API_URL);
    const { drinks } = await response.json();
    return drinks;
  } catch (e) {
    console.log(e);
  }
};

export default fetchDrinkRecipeDetailsById;
