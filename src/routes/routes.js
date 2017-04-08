import React from 'react';
import { Router, Route } from 'react-router';
import App from '../components/App';
import AboutPage from '../components/pages/aboutpage';
import MarketPage from '../components/pages/marketpage';
import IntraDayPage from '../components/pages/intradaypage';

const Routes = (props) => (
  <Router {...props}>
  	<Route path="/"  component={App} /> 
    <Route path="/about" component={AboutPage} />
    <Route path="/marketpage" component={MarketPage}/>
    <Route path="/intradaypage" component={IntraDayPage}/>
  </Router>
);
export default Routes;