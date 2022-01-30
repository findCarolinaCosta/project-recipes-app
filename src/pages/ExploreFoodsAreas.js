import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import fetchAreas from '../services/fetchAreas';
import fetchMeals from '../services/fetchMeals';
import Header from '../components/Header';

function ExploreFoodsAreas() {
  const [areas, setAreas] = useState({});
  const [meals, setMeals] = useState([]);
  const [filterArea, setFilterArea] = useState('all');
  const maxCards = 12;

  const fetchAreasToState = async () => {
    const fetchResponse = await fetchAreas();
    setAreas(fetchResponse.meals);
  };

  const fetchMealsToContext = async () => {
    const fetchResponse = await fetchMeals();
    const arrObj = fetchResponse.meals;
    setMeals(arrObj);
  };

  useEffect(() => {
    fetchAreasToState();
  }, []);

  useEffect(() => {
    fetchMealsToContext();
  }, []);

  return (
    <div className="m-0 p-0 w-full h-full container-explore-area">
      <Header />
      <h3 className="text-center p-3" data-testid="page-title">Explorar Origem</h3>
      <label htmlFor="select-area" className="w-full text-center">
        <select
          className="w-10/12 m-auto pl-3 pr-10 py-2 duration-100
          focus:shadow-blue-500 border-2 transition rounded-md
          text-black text-lg focus:outline-none
          focus:border-blue-400 focus:border-opacity-50"
          name="area"
          id="select-area"
          data-testid="explore-by-area-dropdown"
          onChange={ ({ target }) => setFilterArea(target.value) }
        >
          {
            areas.length > 0
          && areas
            .map((area, index) => (
              <option
                value={ area.strArea }
                key={ `${index} - ${area.strArea}` }
                data-testid={ `${area.strArea}-option` }
              >
                { area.strArea }
              </option>
            ))
          }
          <option
            value="all"
            data-testid="All-option"
          >
            All
          </option>
        </select>
      </label>
      <div className="grid grid-cols-2 gap-3 p-4 m-0">
        {
          meals
            .filter((item) => (filterArea === 'all'
              ? true : item.strArea === filterArea))
            .filter((item, index) => index < maxCards)
            .map((meal, index) => (
              <Link
                className="mb-10 ml-1"
                style={ { width: '40vw' } }
                data-testid={ `${index}-recipe-card` }
                key={ meal.idMeal }
                to={ `/comidas/${meal.idMeal}` }
              >
                <div
                  className="exp-ingredient-card shadow-lg bg-body rounded m-auto"
                >
                  <img
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                    data-testid={ `${index}-card-img` }
                  />
                  <h4 className="card-title p-2" data-testid={ `${index}-card-name` }>
                    {meal.strMeal}
                  </h4>
                </div>
              </Link>
            ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodsAreas;
