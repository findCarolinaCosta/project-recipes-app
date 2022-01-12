import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function RecommendedsCard({ item, index, toRender }) {
  console.log(toRender);
  return (
    // este componente retorna um card para o carrossel de recomendadas
    <div>
      {(toRender === 'drinks')
        ? (
          <Link
            className="custom-card col-xs-6 col-md-3"
            style={ { width: '40vw' } }
            data-testid={ `${index}-recomendation-card` }
            key={ `${index}${item.strDrink}` }
            to={ `/bebidas/${item.idDrink}` }
          >
            <img
              className="img-thumbnail"
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
              data-testid="card-img"
              width="100px"
            />
            <h4
              className="card-title"
              data-testid={ `${index}-recomendation-title` }
            >
              {item.strDrink}
            </h4>
          </Link>)

        : (
          <Link
            className="custom-card col-xs-6 col-md-3"
            style={ { width: '40vw' } }
            data-testid={ `${index}-recomendation-card` }
            key={ `${index}${item.strMeal}` }
            to={ `/bebidas/${item.idMeal}` }
          >
            <img
              className="img-thumbnail"
              src={ item.strMealThumb }
              alt={ item.strMeal }
              data-testid="card-img"
              width="100px"
            />
            <h4
              className="card-title"
              data-testid={ `${index}-recomendation-title` }
            >
              {item.strMeal}
            </h4>
          </Link>)}
    </div>

  );
}

RecommendedsCard.propTypes = {
  index: PropTypes.string.isRequired,
  item: PropTypes.shape({
    idDrink: PropTypes.string,
    idMeal: PropTypes.any,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.any,
    strMealThumb: PropTypes.any,
  }).isRequired,
  toRender: PropTypes.string.isRequired,
};

export default RecommendedsCard;
