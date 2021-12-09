import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();
const { Provider, Consumer } = Context;

function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');

  const context = {
    email,
    setEmail,
  };

  return (
    <Provider value={ context }>
      {children}
    </Provider>
  );
}

export { RecipesProvider as Provider, Consumer, Context };

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
