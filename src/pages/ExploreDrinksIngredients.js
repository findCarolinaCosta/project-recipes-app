import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import fetchDrinksIngredients from '../services/fetchDrinksIngredients';
import profileIcon from '../images/profileIcon.svg';

function ExploreDrinksIngredients() {
  const [ingredients, setIngredients] = useState({});
  const maxCards = 12;
  const fetchByIngredients = async () => {
    const ingredientsObj = await fetchDrinksIngredients();
    setIngredients(ingredientsObj.filter((ingredient, index) => index < maxCards));
  };
  useEffect(() => {
    fetchByIngredients();
  }, []);

  return (
    <div className="exp-ingred-meals-container">
      <div>
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
      </div>
      <h3 className="text-center" data-testid="page-title">Explorar Ingredientes</h3>
      {
        ingredients.length > 0
          && ingredients.map((ingredient, index) => (
            <div
              data-testid={ `${index}-ingredient-card` }
              key={ ingredient.strIngredient1 }
              className="exp-ingredient-card"
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient
                  .strIngredient1}-Small.png` }
                className="card-explore-ingredient"
                alt="Imagem do Ingrediente"
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                { ingredient.strIngredient1 }
              </p>
            </div>
          ))
      }
      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
