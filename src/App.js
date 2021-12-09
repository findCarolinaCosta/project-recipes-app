import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import FoodsRecipes from './pages/FoodsRecipes';
import { Provider } from './context/Context';
import Profile from './pages/Profile';
import RecipesMade from './pages/RecipesMade';
import FavoritesRecipes from './pages/FavoritesRecipes';

function App() {
  return (
    <div className="meals">
      <Provider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/comidas" component={ FoodsRecipes } />
            <Route path="/perfil" component={ Profile } />
            <Route path="/receitas-feitas" component={ RecipesMade } />
            <Route path="/receitas-favoritas" component={ FavoritesRecipes } />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
