import React from 'react';
import { Route,  Switch } from 'react-router-dom';

import AboutPage from '../components/pages/aboutpage';
import MarketPage from '../components/pages/marketpage';
import IntraDayPage from '../components/pages/intradaypage';
import AuthForm from '../components/components/authform';
import UserDashboard from '../components/components/userdashboard';

const Routes = () => (
	  		<div>
	  			<Switch>
	  			 	<Route exact path="/" component={MarketPage} />
				  	<Route exact path="/authform"  component={AuthForm} /> 
				  	<Route exact path="/about" component={AboutPage} />
				    <Route exact path="/intradaypage" component={IntraDayPage} />
				    <Route exact path="/userdashboard" component={UserDashboard} />
		 		</Switch>
		    </div>
);

export default Routes;