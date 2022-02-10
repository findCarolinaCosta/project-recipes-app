import React, { useContext } from 'react';
import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import { Context } from '../context/Context';

function Footer() {
  const { sharedProps: { history } } = useContext(Context);

  return (
    <footer
      className="fixed inset-x-0 bottom-0 flex
      justify-between pl-5 pr-5 pb-3 pt-2 bg-red-700"
      data-testid="footer"
    >
      <button
        data-testid="drinks-bottom-btn"
        type="button"
        onClick={ () => history.push('/bebidas') }
        src={ DrinkIcon }
      >
        <img className="bg-transparent" src={ DrinkIcon } alt="Drinks" />
      </button>
      <button
        data-testid="explore-bottom-btn"
        type="button"
        onClick={ () => history.push('/explorar') }
        src={ ExploreIcon }
      >
        <img className="bg-transparent" src={ ExploreIcon } alt="Explorar" />
      </button>
      <button
        data-testid="food-bottom-btn"
        type="button"
        onClick={ () => history.push('/comidas') }
        src={ MealIcon }
      >
        <img className="bg-transparent" src={ MealIcon } alt="Comidas" />
      </button>
    </footer>
  );
}

export default Footer;
