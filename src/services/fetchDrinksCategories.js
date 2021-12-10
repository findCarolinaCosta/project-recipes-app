const fetchDrinksCategories = async () => {
  try {
    const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(API_URL);
    const { drinks } = await response.json();
    return drinks;
  } catch (e) {
    console.log(e);
  }
};

export default fetchDrinksCategories;
