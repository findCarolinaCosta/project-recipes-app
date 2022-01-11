import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchRandomMeals from '../services/fetchRandomMeals';

function ExploreFoods() {
  const [randomRecipeID, setRandomRecipeID] = useState({});
  const fetchRandom = async () => {
    const recipeObj = await fetchRandomMeals();
    setRandomRecipeID(recipeObj.meals[0].idMeal);
  };
  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div>
      <Header />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          className="btn btn-outline-dark"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          className="btn btn-outline-dark"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to={ `/comidas/${randomRecipeID}` }>
        <button
          type="button"
          className="btn btn-outline-dark"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
