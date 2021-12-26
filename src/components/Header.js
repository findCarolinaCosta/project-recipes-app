import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ props }) {
  const [searchTerm, setSearchTerm] = useState('');

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
        <h3 data-testid="page-title">
          Titulo do Header
        </h3>
      </div>
      <div className="col-sm-6">
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
      {/* </div> */}
      {/* <div className="row"> */}
      <SearchBar searchTerm={ searchTerm } props={ props } />
    </div>
  );
}

Header.propTypes = {
  props: PropTypes.shape().isRequired,
};

export default Header;
