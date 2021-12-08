import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
