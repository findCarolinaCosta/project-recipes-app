import React from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function DrinksRecipes(props) {
  return (
    <>
      <header>
        <Header props={ props } />
      </header>
      <div className="meals">
        <h1>Receitas de comidas</h1>
        <RecipeCard itemToMap="drinks" />
      </div>
    </>
  );
}

export default DrinksRecipes;
