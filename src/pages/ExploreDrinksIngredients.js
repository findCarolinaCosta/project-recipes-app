import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Context } from '../context/Context';
import fetchDrinksIngredients from '../services/fetchDrinksIngredients';

function ExploreDrinksIngredients() {
  const [ingredients, setIngredients] = useState({});
  const maxCards = 12;
  const { setSearchTerm, setIsSearchByIngredient } = useContext(Context);

  const fetchByIngredients = async () => {
    const ingredientsObj = await fetchDrinksIngredients();
    setIngredients(ingredientsObj.filter(
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
    <div className="exp-ingred-meals-container">
      <Header />

      {
        ingredients.length > 0
          && ingredients.map((ingredient, index) => (
            <Link
              to="/bebidas"
              key={ ingredient.strIngredient1 }
              onClick={ () => handleClick(ingredient.strIngredient1) }
            >
              <div
                data-testid={ `${index}-ingredient-card` }
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
            </Link>
          ))
      }

      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
