const fetchMealsByCategories = async (receivedCategory) => {
  const API_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${receivedCategory}`;
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  return jsonResponse.meals;
};

export default fetchMealsByCategories;
