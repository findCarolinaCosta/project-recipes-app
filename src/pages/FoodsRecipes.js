import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

function FoodsRecipes({ history }) {
  return (
    <div>
      FoodsRecipes
      <Footer history={ history } />
    </div>
  );
}

FoodsRecipes.propTypes = {
  history: PropTypes.func.isRequired,
};

export default FoodsRecipes;
