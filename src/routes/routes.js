import React from 'react';
import { Route,  Switch } from 'react-router-dom';
// import {Route} from 'react-router'
import App from '../components/App';
import AboutPage from '../components/pages/aboutpage';
import MarketPage from '../components/pages/marketpage';
import IntraDayPage from '../components/pages/intradaypage';
import AuthForm from '../components/components/authform';


const Routes = () => (

	  		<div>
	  			<Switch>
				  	<Route exact path="/"  component={AuthForm} /> 
				  	<Route exact path="/about" component={AboutPage} />
				  	<Route exact path="/marketpage" component={MarketPage}/>
				    <Route eaxct path="/intradaypage" component={IntraDayPage}/>
		 		</Switch>
		    </div>

);

export default Routes;