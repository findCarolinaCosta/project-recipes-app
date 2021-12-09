import PropTypes from 'prop-types';
import React from 'react';

function ExploreScreen({ history }) {
  return (
    <div>
      <button
        type="button"
        data-testid="explore-food"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Explorar Comidas

      </button>
      <button
        type="button"
        data-testid="explore-drinks"
        onClick={ () => history.push('/explorar/bebidas') }
      >
        Explorar Bebidas

      </button>
    </div>
  );
}

ExploreScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ExploreScreen;
