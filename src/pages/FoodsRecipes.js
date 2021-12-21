import React from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function FoodsRecipes(props) {
  return (
    <>
      <header className="header">
        <Header props={ props } />
      </header>
      <div>
        <h1>Receitas de comidas</h1>
        <RecipeCard itemToMap="meals" props={ props } />
      </div>
    </>
  );
}

export default FoodsRecipes;
