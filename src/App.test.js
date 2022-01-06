import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import renderWithRouter from './helpers/renderWithRouter';

test('Farewell, front-end', () => {
  const { getByText } = renderWithRouter(<App />);
});
