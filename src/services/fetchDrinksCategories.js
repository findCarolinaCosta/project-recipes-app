const fetchDrinksCategories = async () => {
  const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  return jsonResponse;
};

export default fetchDrinksCategories;
