import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
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
import DrinksRecipesInProgress from './pages/DrinksRecipesInProgress';
import MealsRecipsInProgress from './pages/MealsRecipesInProgress';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodsIngredients from './pages/ExploreFoodsIngredients';
import ExploreFoodsAreas from './pages/ExploreFoodsAreas';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <div
      className="bg-red-700 w-screen"
    >
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas/:id/in-progress" component={ MealsRecipsInProgress } />
          <Route path="/comidas/:id" component={ RecipeDetails } />
          <Route path="/comidas" component={ FoodsRecipes } />
          <Route path="/bebidas/:id/in-progress" component={ DrinksRecipesInProgress } />
          <Route path="/bebidas/:id" component={ RecipeDetails } />
          <Route path="/bebidas" component={ DrinksRecipes } />
          <Route path="/perfil" component={ Profile } />
          <Route path="/receitas-feitas" component={ RecipesMade } />
          <Route path="/receitas-favoritas" component={ FavoritesRecipes } />
          <Route exact path="/explorar" component={ ExploreScreen } />
          <Route
            path="/explorar/comidas/ingredientes"
            component={ ExploreFoodsIngredients }
          />
          <Route path="/explorar/comidas/area" component={ ExploreFoodsAreas } />
          <Route
            path="/explorar/bebidas/ingredientes"
            component={ ExploreDrinksIngredients }
          />
          <Route path="/explorar/bebidas/area" component={ ErrorPage } />
          <Route path="/explorar/comidas" component={ ExploreFoods } />
          <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        </Switch>
      </Provider>
    </div>
  );
}

export default App;
