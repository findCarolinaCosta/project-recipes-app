const fetchRandomDrinks = async () => {
  const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  return jsonResponse.drinks[0];
};

export default fetchRandomDrinks;
