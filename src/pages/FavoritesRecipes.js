import React from 'react';
import Header from '../components/Header';

function FavoritesRecipes(props) {
  return (
    <div>
      <Header props={ props } />
      <h1>Receitas favoritas</h1>
    </div>
  );
}

export default FavoritesRecipes;
