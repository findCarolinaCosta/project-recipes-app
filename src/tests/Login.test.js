import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const VALID_EMAIL = 'trybe@trybe.com';
const INVALID_EMAIL = 'trybe.com';
const VALID_PASSWORD = '1234567';
const INVALID_PASSWORD = '12345';

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

describe('Tela de Login', () => {
  test('Verifica se o botão esta ativado quando os campos estiverem invalidos', () => {
    renderWithRouter(<App />);
    const { inputEmail, inputPassword, buttonSubmit } = returnInfo();
    userEvent.type(inputEmail, INVALID_EMAIL);
    userEvent.type(inputPassword, INVALID_PASSWORD);
    expect(buttonSubmit).toBeInTheDocument();
    expect(buttonSubmit).toBeDisabled();
  });

  test('Verifica se o botão esta ativado quando os campos estiverem validos', () => {
    renderWithRouter(<App />);
    const { inputEmail, inputPassword, buttonSubmit } = returnInfo();
    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);
    expect(buttonSubmit).toBeInTheDocument();
    expect(buttonSubmit).not.toBeDisabled();
  });

  test('Após a submissão verifica se os dois tokens estão salvos no localStorage', () => {
    renderWithRouter(<App />);
    const { inputEmail, inputPassword, buttonSubmit } = returnInfo();
    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);
    userEvent.click(buttonSubmit);
    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');
  });

  test('Verifica se o e-mail está salvo na chave user após a submissão', () => {
    renderWithRouter(<App />);
    const { inputEmail, inputPassword, buttonSubmit } = returnInfo();
    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputPassword, VALID_PASSWORD);
    userEvent.click(buttonSubmit);
    const user = localStorage.getItem('user');
    const { email } = JSON.parse(user);
    expect(email).toBe(VALID_EMAIL);
  });

  test('Verifica se o usuario é redirecionado para a tela principal após validar', () => {
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
  });
});
