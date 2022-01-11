import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchIngredients from '../services/fetchIngredients';

function ExploreFoodsIngredients() {
  const [ingredients, setIngredients] = useState({});
  const maxCards = 12;
  const fetchByIngredients = async () => {
    const ingredientsObj = await fetchIngredients();
    setIngredients(ingredientsObj.meals.filter((ingredient, index) => index < maxCards));
  };
  useEffect(() => {
    fetchByIngredients();
  }, []);

  return (
    <div className="exp-ingred-meals-container">
      <Header />
      {
        ingredients.length > 0
          && ingredients.map((ingredient, index) => (
            <div
              data-testid={ `${index}-ingredient-card` }
              key={ ingredient.idIngredient }
              className="exp-ingredient-card"
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${ingredient
                  .strIngredient}-Small.png` }
                className="card-explore-ingredient"
                alt="Imagem do Ingrediente"
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                { ingredient.strIngredient }
              </p>
            </div>
          ))
      }
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngredients;
