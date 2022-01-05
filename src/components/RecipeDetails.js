import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../context/Context';
import fetchMealRecipeDetailsById from '../services/fetchMealRecipeDetailsById';
import fetchDrinkRecipeDetailsById from '../services/fetchDrinkRecipeDetailsById';

function RecipeDetails(props) {
  const { setSharedProps } = useContext(Context);
  const { match: { params: { id } }, location: { pathname } } = props;
  const [recipeId, setRecipeId] = useState('');

  useEffect(() => {
    if (pathname.includes('comidas')) {
      fetchMealRecipeDetailsById(id).then((response) => setRecipeId(response));
    }
    if (pathname.includes('bebidas')) {
      fetchDrinkRecipeDetailsById(id).then((response) => setRecipeId(response));
    }
    setSharedProps(props);
  }, [props, setSharedProps, id, pathname]);

  return (
    <div
      className="container recipes-container"
      style={ { height: '100vh' } }
    >
      <div className="row">
        <div className="col-sm-12">
          <img />
        </div>
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};

export default RecipeDetails;
