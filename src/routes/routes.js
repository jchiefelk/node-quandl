import React from 'react';
import { Router, Route } from 'react-router';
import App from '../components/App';
import AboutPage from '../components/pages/aboutpage';
import ArticlePage from '../components/pages/articlepage';
import StockviewPage from '../components/pages/stockviewpage';

const Routes = (props) => (
  <Router {...props}>
  	<Route path="/"  component={App} /> 
    <Route path="/articles" component={ArticlePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/stockview" component={StockviewPage} />
  </Router>
);
export default Routes;