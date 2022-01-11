import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import fetchAreas from '../services/fetchAreas';
import fetchMeals from '../services/fetchMeals';

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
    console.log(arrObj);
    setMeals(arrObj);
  };

  useEffect(() => {
    fetchAreasToState();
  }, []);

  useEffect(() => {
    fetchMealsToContext();
  }, []);

  return (
    <div>
      <label htmlFor="select-area">
        <select
          className="form-select form-select-lg"
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
      {
        meals
          .filter((item) => (filterArea === 'all'
            ? true : item.strArea === filterArea))
          .filter((item, index) => index < maxCards)
          .map((meal, index) => (
            <Link
              className="custom-card col-sm-6 col-md-3"
              style={ { width: '40vw' } }
              data-testid={ `${index}-recipe-card` }
              key={ meal.idMeal }
              to={ `/comidas/${meal.idMeal}` }
            >
              <img
                className="img-thumbnail"
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
                width="100px"
              />
              <h4 className="card-title" data-testid={ `${index}-card-name` }>
                {meal.strMeal}
              </h4>
            </Link>
          ))
      }
      <Footer />
    </div>
  );
}

export default ExploreFoodsAreas;
