import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fetchRandomDrinks from '../services/fetchRandomDrinks';

function ExploreDrinks() {
  const [randomRecipeID, setRandomRecipeID] = useState({});
  const fetchRandom = async () => {
    const recipeObj = await fetchRandomDrinks();
    setRandomRecipeID(recipeObj.drinks[0].idDrink);
  };
  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div>
      <Header />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          className="btn btn-outline-dark"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${randomRecipeID}` }>
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

export default ExploreDrinks;
