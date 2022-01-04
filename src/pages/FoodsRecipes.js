import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function FoodsRecipes(props) {
  const { history } = props;
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
      <div>
        FoodsRecipes
        <Footer history={ history } />
      </div>
    </div>
  );
}

FoodsRecipes.propTypes = {
  history: PropTypes.func.isRequired,
};

export default FoodsRecipes;
