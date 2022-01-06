import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import FoodsRecipes from './pages/FoodsRecipes';
import { Provider } from './context/Context';
import Profile from './pages/Profile';
import RecipesMade from './pages/RecipesMade';
import FavoritesRecipes from './pages/FavoritesRecipes';
import ExploreScreen from './pages/ExploreScreen';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import DrinksRecipes from './pages/DrinksRecipes';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <div
      className="container-sm-fluid align-items-center d-flex flex-wrap"
      style={ { height: '100vh', width: '100vw' } }
    >
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas/:id" component={ RecipeDetails } />
          <Route path="/comidas" component={ FoodsRecipes } />
          <Route path="/bebidas/:id" component={ RecipeDetails } />
          <Route path="/bebidas" component={ DrinksRecipes } />
          <Route path="/perfil" component={ Profile } />
          <Route path="/receitas-feitas" component={ RecipesMade } />
          <Route path="/receitas-favoritas" component={ FavoritesRecipes } />
          <Route exact path="/explorar" component={ ExploreScreen } />
          <Route path="/explorar/comidas" component={ ExploreFoods } />
          <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
