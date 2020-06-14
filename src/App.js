import React, { Component } from 'react';
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Layout from './containers/Layout/Layout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Authentication from './containers/Authentication/Authentication';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            {/* <BurgerBuilder />
            <Checkout /> */}
          </Layout>
        </div>
        <Switch>
          <Route path="/authentication" component={Authentication} />
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
