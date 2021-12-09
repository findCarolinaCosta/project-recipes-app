import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import FoodsRecipes from './pages/FoodsRecipes';
import { Provider } from './Context/Context';
import Perfil from './pages/Perfil';

function App() {
  return (
    <div className="meals">
      <Provider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/comidas" component={ FoodsRecipes } />
            <Route path="/perfil" component={ Perfil } />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
