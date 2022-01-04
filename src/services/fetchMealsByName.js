const fetchMealsByName = async (receivedName) => {
  const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${receivedName}`;
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  return jsonResponse.meals;
};

export default fetchMealsByName;
