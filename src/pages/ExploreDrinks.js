import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import fetchRandomDrinks from '../services/fetchRandomDrinks';
import profileIcon from '../images/profileIcon.svg';

function ExploreDrinks() {
  const [randomRecipeID, setRandomRecipeID] = useState({});
  const fetchRandom = async () => {
    const recipeObj = await fetchRandomDrinks();
    setRandomRecipeID(recipeObj.idDrink);
  };
  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div className="bg-red-700 w-screen">
      <div className="p-3 bg-red-700 m-0">
        <Link to="/perfil">
          <button type="button">
            <img
              src={ profileIcon }
              alt="profile-icon"
              className="bg-red-700"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
      </div>
      <div className="w-screen h-screen flex flex-col">
        <h3
          className="text-center
      text-red-900 font-black  p-3"
          data-testid="page-title"
        >
          Explorar Bebidas
        </h3>
        <section className="btn-group gap-4 p-3 justify-center">
          <Link to="/explorar/bebidas/ingredientes">
            <button
              type="button"
              className="btn btn-outline-danger"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to={ `/bebidas/${randomRecipeID}` }>
            <button
              type="button"
              className="btn btn-outline-danger"
              data-testid="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </Link>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
