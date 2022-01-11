import PropTypes from 'prop-types';
import React from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import RecommendedsCard from './RecommendedsCard';

function Recommendeds({ items }) {
  const cardsToCarousel = items.map((recipe, index) => (
    // renderizar o componente de card aqui.
    <RecommendedsCard
      item={ recipe }
      index={ index }
      key={ recipe.idDrink ? recipe.idDrink : recipe.idMeal }
      toRender={ recipe.idMeal ? 'meals' : 'drinks' }
    />
  ));

  return (
    // renderizar uma div com um carrossel
    // e o carrossel terá 3 divs, sendo que
    // uma delas será ativa por vez e cada
    // uma delas conterá 2 card (card[0] card[1],
    // card[2] card[3], ...)
    <div className="row">
      <Carousel indicators={ false }>
        <CarouselItem>
          <div className="row">
            { cardsToCarousel[0] }
            { cardsToCarousel[1] }
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="row">
            { cardsToCarousel[2] }
            { cardsToCarousel[3] }
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="row">
            { cardsToCarousel[4] }
            { cardsToCarousel[5] }
          </div>
        </CarouselItem>
      </Carousel>

    </div>
  );
}

Recommendeds.propTypes = {
  items: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default Recommendeds;
