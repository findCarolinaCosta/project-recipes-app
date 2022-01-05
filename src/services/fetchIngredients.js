const fetchIngredients = async () => {
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  return jsonResponse;
};

export default fetchIngredients;
