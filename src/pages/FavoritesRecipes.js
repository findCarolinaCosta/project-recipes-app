import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import profileIcon from '../images/profileIcon.svg';

function FavoritesRecipes() {
  return (
    <div className="row">
      <div className="col-sm-2">
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
      <Footer />
    </div>
  );
}

export default FavoritesRecipes;
