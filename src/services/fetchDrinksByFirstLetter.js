const fetchDrinksByFirstLetter = async (receivedLetter) => {
  const API_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${receivedLetter}`;
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  return jsonResponse.drinks;
};

export default fetchDrinksByFirstLetter;
