import React, {Component} from 'react';
var API = require('../../api_utls/api');


class AuthForm extends Component {

	constructor(){
		super();
		this.state ={
			userName:  null,
			userPassword: null,
			type: 'existing_user'
		};
	}

	updateUserPassword(e){
		this.setState({userPassword: e.target.value});
	}

	updateUserName(e){
		this.setState({userName: e.target.value});
	}

	subitNewUser(){
		API.setNewUser({
			userName: this.state.userName,
			userPassword: this.state.userPassword
		});
	}

	submitExistingUser(){

		API.checkExistingUser({
			userName: this.state.userName,
			userPassword: this.state.userPassword
		});
	}

	setViewType(type) {

			this.setState({
				type: type 
			});
	}

	setNewUserFormView(){


		return(

				<div>
					<h2>Set your username and password</h2>
					<input placeholder="Username" onChange={(e) => this.updateUserName(e)} />
					<input placeholder="Password" onChange={(e) => this.updateUserPassword(e)} />
					<button type="submit" onClick={()=> this.subitNewUser() }>Submit</button>
					<h4 onClick={()=> this.setViewType('existing_user')}>Existing User?</h4>
				</div>
		);

	}


	setExistingUserForm(){


		return(
				<div>
					<h2>Existing User</h2>
					<input placeholder="Username" onChange={(e) => this.updateUserName(e)} />
					<input placeholder="Password" onChange={(e) => this.updateUserPassword(e)} />
					<button type="submit" onClick={()=> this.submitExistingUser() }>Submit</button>
					<h4 onClick={()=> this.setViewType('new_user')}>New User?</h4>
				</div>
		);
	}



	render(){
		let view=null;
		if(this.state.type=='existing_user') {
			view = this.setExistingUserForm();
		}

		if(this.state.type=='new_user'){
			view = this.setNewUserFormView();
		}

		return(
			<div className="auth_form">
						{view}
			</div>
		);
	}

};


export default AuthForm;