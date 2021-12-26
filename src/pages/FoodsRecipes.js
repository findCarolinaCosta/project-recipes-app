import React from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function FoodsRecipes(props) {
  return (
    <div className="recipes-container container-fluid">
      <header className="row">
        <Header className="container-fluid" props={ props } />
      </header>
      <div className="row">
        <RecipeCard
          className="container-fluid"
          itemToMap="meals"
          props={ props }
        />
      </div>
    </div>
  );
}

export default FoodsRecipes;
