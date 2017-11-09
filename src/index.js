import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/routes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
require('./components/css/main.css');
require('./components/css/react-datetime.css');
require('./components/css/marketpicker.css');

ReactDOM.render(
	<BrowserRouter>
		<Routes/>
	</BrowserRouter>
  ,
  document.getElementById('root')
);
