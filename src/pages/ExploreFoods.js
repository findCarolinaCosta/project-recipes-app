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
    <div className="row">
      <div className="col-sm-2">
        <Link to="/perfil">
          <button type="button">
            <img
              src={ profileIcon }
              alt="profile-icon"
              className="header-profile-icon"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
        <h3 className="text-center" data-testid="page-title">Explorar Comidas</h3>
      </div>
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
