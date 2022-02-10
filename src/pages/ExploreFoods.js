import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import fetchRandomMeals from '../services/fetchRandomMeals';
import profileIcon from '../images/profileIcon.svg';

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
    <div className="bg-red-700 w-screen">
      <div className=" p-3 bg-red-700 m-0">
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
      <section className="w-screen h-screen">
        <h3
          className="text-center
      text-red-900 font-black  p-3"
          data-testid="page-title"
        >
          Explorar Comidas

        </h3>
        <div className="btn-group gap-4 p-3">
          <Link to="/explorar/comidas/ingredientes">
            <button
              type="button"
              className="btn btn-outline-danger"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to="/explorar/comidas/area">
            <button
              type="button"
              className="btn btn-outline-danger"
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </Link>
          <Link to={ `/comidas/${randomRecipeID}` }>
            <button
              type="button"
              className="btn btn-outline-danger"
              data-testid="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
