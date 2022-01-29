import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import ButtonShare from '../components/ButtonShare';

const setFavoritesToState = () => {
  if (localStorage.getItem('favoriteRecipes')) {
    return JSON.parse(localStorage.getItem('favoriteRecipes'));
  }
  return [];
};

export default function FavoritesRecipes() {
  const [favoriteStorage, setFavoriteStorage] = useState(setFavoritesToState());
  const [currFilter, setCurrFilter] = useState('all');

  const handleFavoriteButton = (id) => {
    setFavoriteStorage((prev) => {
      const newFavorites = prev
        .filter((favoriteItem) => favoriteItem.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const handleFilter = ({ target }) => { setCurrFilter(target.name); };

  return (
    <div className="h-screen w-screen flex flex-col">
      <section className="p-3 bg-red-700 m-0 grid grid-cols-4 grid-rows-1">
        <Link to="/perfil">
          <button type="button">
            <img
              src={ profileIcon }
              alt="profile-icon"
              className="bg-transparent mt-1"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
        <h3
          className="bg-transparent col-start-2 col-span-4 mt-auto mb-auto"
          data-testid="page-title"
        >
          Receitas Favoritas

        </h3>
      </section>
      <section className="btn-group p-3">
        <button
          type="button"
          className="btn btn-outline-danger"
          data-testid="filter-by-all-btn"
          name="all"
          onClick={ handleFilter }
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          data-testid="filter-by-food-btn"
          name="foods"
          onClick={ handleFilter }
        >
          Foods
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          data-testid="filter-by-drink-btn"
          name="drinks"
          onClick={ handleFilter }
        >
          Drinks
        </button>
      </section>
      <section className="d-flex flex-wrap justify-content-center gap-5 p-3">
        {
          favoriteStorage.filter((favorite) => {
            if (currFilter === 'foods') {
              return favorite.type === 'comida';
            }

            if (currFilter === 'drinks') {
              return favorite.type === 'bebida';
            }

            return true;
          }).map((favorite, index) => (
            <section
              key={ favorite.id }
              className="card flex-row shadow-lg bg-body rounded w-full"
            >
              <Link
                to={ `/${favorite.type}s/${favorite.id}` }
                style={ { width: '40vw' } }
              >
                <img
                  src={ favorite.image }
                  alt="Imagem da receita"
                  className="img-card-favorite"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <div className="card-body bg-white">
                <div className="bg-white flex justify-between gap-6">
                  <p
                    className="card-title bg-transparent
                    text-muted m-auto text-xs align-middle"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { `${favorite.area} - ${favorite.category}`}
                    {` ${favorite.alcoholicOrNot}`}
                  </p>
                  <nav className="in-progress-butons mb-36">
                    <ButtonShare />
                    <button
                      type="button"
                      className="btn"
                      name={ favorite.name }
                      onClick={ () => handleFavoriteButton(favorite.id) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ blackHeartIcon }
                        alt="Botão de compartilhamento"
                      />
                    </button>
                  </nav>
                </div>
                <Link to={ `/${favorite.type}s/${favorite.id}` }>
                  <h1
                    className="card-title bg-transparent m-auto"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { favorite.name }
                  </h1>
                </Link>
              </div>
            </section>
          ))
        }
      </section>
    </div>
  );
}
