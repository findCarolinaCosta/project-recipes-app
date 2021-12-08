import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import FoodsRecipes from './pages/FoodsRecipes';

function App() {
  return (
    <div className="meals">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ FoodsRecipes } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
