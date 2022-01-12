import PropTypes from 'prop-types';
import React from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import RecommendedsCard from './RecommendedsCard';

/**
 * Consultei a PR do Grupo 10, em:
 * https://github.com/tryber/sd-015-b-project-recipes-app/pull/79/files
 * Para entender que para mostrar um carrossel eu deveria primeiro criar um componente para renderizar os cards
 * e passar minha lista de items para carregar nos cards.
 * Após isto, eu precisava criar um outro componente para renderizar um card e passar a ele qual índice deveria ser
 * mostrado por vez.
 * E por fim, no retorno do meu componente Recommendeds eu aprendi um pouco sobre como utilizar o Carousel do react-bootstrap
 * para renderizar os itens da forma que o requisito do projeto pedia.
 * Também deixo o agradecimento aos mentores Gabriel Espíndola e Arthur Procópio, sendo que o primeiro me ajudou a entender como
 * montar a lista de receitas para enviar à seção recomendadas e o segundo me ajudou a entender que o teste não aceita que esta
 * lista seja feita de forma aleatória.
 * Obrigado a todas as pessoas que me ajudaram mesmo sem tomar conhecimento.
 */

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
