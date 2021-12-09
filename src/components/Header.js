import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');

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
        <p data-testid="page-title">
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
        <input
          id="search-input"
          type="text"
          data-testid="search-input"
          placeholder="Busca..."
          value={ searchTerm }
          onChange={ ({ target }) => setSearchTerm(target.value) }
        />
      </div>
      <div>
        <SearchBar searchTerm={ searchTerm } />
      </div>
    </section>
  );
}

export default Header;
