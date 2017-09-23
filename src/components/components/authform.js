import React, {Component} from 'react';
var API = require('../../api_utls/api');


class AuthForm extends Component {

	constructor(){
		super();
		this.state ={
			userName:  null,
			userPassword: null,
		};
	}

	updateUserPassword(e){

		this.setState({userName: e.target.value});

	}

	updateUserName(e){

		this.setState({userPassword: e.target.value});
	}

	subitNewUser(){
		API.setNewUser({
			userName: this.state.userName,
			userPassword: this.state.userPassword
		});
	}
	

	render(){
		return(
			<div className="auth_form">
				<input placeholder="Username" onChange={(e) => this.updateUserName(e)} />
				<input placeholder="Password" onChange={(e) => this.updateUserPassword(e)} />


				<button type="submit" onClick={()=> this.subitNewUser() }>Submit</button>
			</div>
		);
	}

};


export default AuthForm;