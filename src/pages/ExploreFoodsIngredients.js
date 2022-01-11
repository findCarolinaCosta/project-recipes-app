import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Context } from '../context/Context';
import fetchIngredients from '../services/fetchIngredients';

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
    <div className="exp-ingred-meals-container">
      <Header />

      {
        ingredients.length > 0
          && ingredients.map((ingredient, index) => (
            <Link
              to="/comidas"
              key={ ingredient.idIngredient }
              onClick={ () => handleClick(ingredient.strIngredient) }
            >
              <div
                data-testid={ `${index}-ingredient-card` }
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
            </Link>
          ))
      }

      <Footer  />
    </div>
  );
}

export default ExploreFoodsIngredients;
