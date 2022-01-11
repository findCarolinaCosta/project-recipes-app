import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import fetchRandomDrinks from '../services/fetchRandomDrinks';
import profileIcon from '../images/profileIcon.svg';

function ExploreDrinks() {
  const [randomRecipeID, setRandomRecipeID] = useState({});
  const fetchRandom = async () => {
    const recipeObj = await fetchRandomDrinks();
    setRandomRecipeID(recipeObj.drinks[0].idDrink);
  };
  useEffect(() => {
    fetchRandom();
  }, []);
  console.log(randomRecipeID);
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
        <h3 className="text-center" data-testid="page-title">Explorar Bebidas</h3>
      </div>
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
