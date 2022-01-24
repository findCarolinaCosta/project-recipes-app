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
    <div className="self-center mb-52 w-screen m-0 p-0">
      <Carousel indicators={ false }>
        <CarouselItem>
          <div className="flex gap-2 justify-center m-2">
            { cardsToCarousel[0] }
            { cardsToCarousel[1] }
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="flex gap-2 justify-center">
            { cardsToCarousel[2] }
            { cardsToCarousel[3] }
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="flex gap-2 justify-center">
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
