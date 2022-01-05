import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const VALID_EMAIL = 'trybe@trybe.com';
const VALID_PASSWORD = '1234567';

const returnInfo = () => {
  const inputEmail = screen.getByTestId('email-input');
  const inputPassword = screen.getByTestId('password-input');
  const buttonSubmit = screen.getByTestId('login-submit-btn');
  return {
    inputEmail,
    inputPassword,
    buttonSubmit,
  };
};

const renderHeader = () => {
  const { history: { location } } = renderWithRouter(<App />);
  const { inputEmail, inputPassword, buttonSubmit } = returnInfo();
  userEvent.type(inputEmail, VALID_EMAIL);
  userEvent.type(inputPassword, VALID_PASSWORD);
  userEvent.click(buttonSubmit);
  const currentLocation = location.pathname;
  const awaitForRedirect = 1000;
  setTimeout(() => {
    expect(currentLocation).toBe('/comidas');
  }, awaitForRedirect);
};

describe('Header', () => {
  beforeEach(renderHeader);
  test('Verifique se os data-testids estão implementados no Header', () => {
    const buttonProfile = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const buttonSearch = screen.getByTestId('search-top-btn');
    expect(buttonProfile).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(buttonSearch).toBeInTheDocument();
  });
});
