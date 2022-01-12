import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import { Context } from '../context/Context';

function Header() {
  const { searchTerm, setSearchTerm } = useContext(Context);
  const [isVisible, setIsVisible] = useState(false);
  function handleClick() {
    return !isVisible ? setIsVisible(true) : setIsVisible(false);
  }

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
      </div>
      <div className="col-sm-4">
        {/* <h3 data-testid="page-title">
          Comidas
        </h3> */}
      </div>
      <div className="col-sm-6">
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
        { isVisible && <input
          data-testid="search-input"
          id="search-input"
          type="text"
          placeholder="Busca..."
          className="recipes-search-input"
          value={ searchTerm }
          onChange={ ({ target }) => setSearchTerm(target.value) }
        /> }
      </div>
      <SearchBar />
    </div>
  );
}

export default Header;
