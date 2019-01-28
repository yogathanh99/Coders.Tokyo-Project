import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import TopMenu from './components/TopMenu'
import Home from './views/Home'
import Product from './views/Product'
import {CartProvider} from './contexts/Cart'

class App extends Component {
  render() {
    return (
      <CartProvider>
        <Router>
          <div className="App">
            <TopMenu />

            <Route path="/" exact component={Home} />
            <Route path="/product/" component={Product} />
            <Route path="/cart/" component={Product} />
          </div>
        </Router>
      </CartProvider>
    );
  }
}

export default App;
