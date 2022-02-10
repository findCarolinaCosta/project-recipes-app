import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import Footer from '../components/Footer';
import fetchIngredients from '../services/fetchIngredients';
import profileIcon from '../images/profileIcon.svg';

function ExploreFoodsIngredients() {
  const [ingredients, setIngredients] = useState({});
  const maxCards = 12;
  const { setSearchTerm, setIsSearchByIngredient } = useContext(Context);

  const fetchByIngredients = async () => {
    const ingredientsObj = await fetchIngredients();
    setIngredients(ingredientsObj.meals.filter(
      (__ingredient, index) => index < maxCards,
    ));
  };

  useEffect(() => {
    fetchByIngredients();
  }, []);

  const handleClick = (ingredientName) => {
    setSearchTerm(ingredientName);
    setIsSearchByIngredient(true);
  };

  return (
    <div className="exp-ingred-meals-container gap-0 m-0 p-0 w-screen">
      <div className="p-3 bg-red-700 m-0 grid grid-cols-4 grid-rows-1">
        <Link to="/perfil">
          <button type="button">
            <img
              src={ profileIcon }
              alt="profile-icon"
              className="bg-transparent mt-1"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
        <h3
          className="bg-transparent col-start-2 col-span-4 mt-auto mb-auto"
          data-testid="page-title"
        >
          Ingredientes

        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3 p-4 m-auto">
        {
          ingredients.length > 0
          && ingredients.map((ingredient, index) => (
            <Link
              to="/comidas"
              key={ ingredient.idIngredient }
              onClick={ () => handleClick(ingredient.strIngredient) }
              className="m-0"
            >
              <div
                data-testid={ `${index}-ingredient-card` }
                className="exp-ingredient-card shadow-lg bg-body rounded m-auto"
              >
                <img
                  src={ `https://www.themealdb.com/images/ingredients/${ingredient
                    .strIngredient}-Small.png` }
                  className="card-explore-ingredient m-auto"
                  alt="Imagem do Ingrediente"
                  data-testid={ `${index}-card-img` }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  { ingredient.strIngredient }
                </p>
              </div>
            </Link>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngredients;
