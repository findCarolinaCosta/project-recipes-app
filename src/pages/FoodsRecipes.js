import React, { useEffect, useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { Context } from '../context/Context';

function FoodsRecipes(props) {
  const { setSharedProps } = useContext(Context);
  setSharedProps(props);
  return (
    <div className="recipes-container container-fluid">
      <header className="row">
        <Header className="container-fluid" props={ props } />
      </header>
      <div className="row">
        <RecipeCard
          className="container-fluid"
          itemToMap="meals"
        />
      </div>
      <div>
        FoodsRecipes
        <Footer />
      </div>
    </div>
  );
}

export default FoodsRecipes;
