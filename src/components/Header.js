import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [isVisible, setIsVisible] = useState(false);
  function handleClick() {
    return !isVisible ? setIsVisible(true) : setIsVisible(false);
  }
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
        <button
          type="button"
          onClick={ handleClick }
        >
          <img
            src={ searchIcon }
            alt="search-icon"
            className="header-search-icon"
            data-testid="search-top-btn"
          />
        </button>
        { isVisible && (<input
          id="search-input"
          type="text"
          data-testid="search-input"
          placeholder="Busca..."
        />) }
      </div>
    </section>
  );
}

export default Header;
