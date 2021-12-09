import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <section>
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
      </div>
      <div>
        <p data_testid="page-title">
          Titulo do Header
        </p>
      </div>
      <div>
        <button type="button">
          <img
            src={ searchIcon }
            alt="search-icon"
            className="header-search-icon"
            data-testid="search-top-btn"
          />
        </button>
      </div>
    </section>
  );
}

export default Header;
