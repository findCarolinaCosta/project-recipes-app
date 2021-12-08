import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import FoodsRecipes from './pages/FoodsRecipes';
import { Provider } from './context/Context';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="meals">
      <Provider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route path="/comidas" component={ FoodsRecipes } />
            <Route path="/perfil" component={ Profile } />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
