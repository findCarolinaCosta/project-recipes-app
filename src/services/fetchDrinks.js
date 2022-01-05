const fetchDrinks = async () => {
  const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  return jsonResponse;
};

export default fetchDrinks;
