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
    <div className="bg-red-700 p-2 w-screen top-0">
      <div className="flex justify-between p-3 bg-red-700">
        <Link to="/perfil">
          <button type="button">
            <img
              src={ profileIcon }
              alt="profile-icon"
              className="bg-red-700"
              data-testid="profile-top-btn"
            />
          </button>
        </Link>
        <button
          type="button"
          onClick={ handleClick }
        >
          <img
            src={ searchIcon }
            alt="search-icon"
            className="bg-red-700"
            data-testid="search-top-btn"
          />
        </button>
      </div>
      { isVisible && <input
        className="self-center border-2 border-danger bg-red transition px-2 h-10
        rounded-md focus:outline-none text-black text-lg sm:px-5 pr-10 sm:pr-16
        m-2 p-2 sm:h-12"
        type="search"
        name="search"
        placeholder="Search"
        id="search__input"
        data-testid="search-input"
        value={ searchTerm }
        onChange={ ({ target }) => setSearchTerm(target.value) }
      /> }
      <SearchBar />
    </div>
  );
}

export default Header;
