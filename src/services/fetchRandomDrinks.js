const fetchRandomDrinks = async () => {
  const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  return jsonResponse.drinks;
};

// const fetchRandomDrinks = (receivedRepetitions) => {
//   const recipesList = [];
//   for (let index = 0; index < receivedRepetitions; index += 1) {
//     const recipe = fetchRandomDrink();
//     recipesList.push(recipe);
//   }
//   console.log(recipesList);
//   return recipesList;
// };

export default fetchRandomDrinks;
