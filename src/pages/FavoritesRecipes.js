import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import profileIcon from '../images/profileIcon.svg';

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
  const handleShareBtn = (recipeID) => {
    const element = document.getElementById(`favorite-${recipeID}`);
    element.innerText = 'Link copiado!';
  };

  return (
    <div className="favorite-container">
      <div>
        <Link to="/perfil">
          <button type="button">
            <img
              src={ profileIcon }
              alt="profile-icon"
              className="header-profile-icon"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
        <h3 className="text-center" data-testid="page-title">Receitas Favoritas</h3>
      </div>
      <nav>
        <button
          type="button"
          className="btn btn-outline-info btn-sm"
          data-testid="filter-by-all-btn"
          name="all"
          onClick={ handleFilter }
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-outline-info btn-sm"
          data-testid="filter-by-food-btn"
          name="foods"
          onClick={ handleFilter }
        >
          Foods
        </button>
        <button
          type="button"
          className="btn btn-outline-info btn-sm"
          data-testid="filter-by-drink-btn"
          name="drinks"
          onClick={ handleFilter }
        >
          Drinks
        </button>
      </nav>
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
          <div
            className="card-favorite"
            key={ favorite.name }
          >
            <Link to={ `/${favorite.type}s/${favorite.id}` }>
              <img
                src={ favorite.image }
                alt="Imagem da receita"
                className="img-card-favorite"
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div className="card-text">
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${favorite.area} - ${favorite.category}`}
                {` ${favorite.alcoholicOrNot}`}
              </p>
              <Link to={ `/${favorite.type}s/${favorite.id}` }>
                <h5
                  data-testid={ `${index}-horizontal-name` }
                >
                  { favorite.name }
                </h5>
              </Link>
              <nav className="in-progress-butons mb-36">
                <button
                  type="button"
                  className="btn"
                  id={ `favorite-${favorite.id}` }
                  onClick={ () => {
                    navigator.clipboard.writeText(window.location
                      .href.replace('/receitas-favoritas', `/${favorite
                        .type}s/${favorite.id}`))
                      .then(() => { handleShareBtn(favorite.id); });
                  } }
                >
                  <img
                    src={ shareIcon }
                    alt="Botão de compartilhamento"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
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

          </div>
        ))
      }
      <Footer />
    </div>
  );
}
