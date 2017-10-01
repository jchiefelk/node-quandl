import React, {Component} from 'react';
var API = require('../../api_utls/api');
var GeneralStore = require('../../stores/generalstore');
import { NavLink, withRouter, Link } from 'react-router-dom';


class AuthForm extends Component {

	constructor(){
		super();
		this.state ={
			userName:  null,
			userPassword: null,
			type: 'existing_user',
			status: GeneralStore.getSubmitStatus()
		};
	}

	componentDidMount(){
		GeneralStore.addChangeListener(this._onChange.bind(this));
	}
	
	componentWillUnmount(){
		GeneralStore.removeChangeListener(this._onChange.bind(this));
	}
	
	_onChange(){
		this.setState({status: GeneralStore.getSubmitStatus()});
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
					<Link onClick={()=> this.setViewType('existing_user')} to="marketpage">Existing User?</Link>
				</div>
		);

	}


	setExistingUserForm(){

		//
		// onClick={()=> this.setViewType('new_user')}
		//

		return(
				<div>
					<h2>Existing User</h2>
					<input placeholder="Username" onChange={(e) => this.updateUserName(e)} />
					<input type="password"  placeholder="Password" onChange={(e) => this.updateUserPassword(e)} />
					<button type="submit" onClick={()=> this.submitExistingUser() }>Submit</button>
					<Link  to="marketpage">New User?</Link>
				</div>
		);
	}



	render(){


		let view=null;
		if(this.state.status.message=="first load" && this.state.type=='existing_user') {
			view = this.setExistingUserForm();
		}

		if(this.state.status.message=="first load" && this.state.type=='new_user'){
			view = this.setNewUserFormView();
		}

		if(this.state.status.message!="first load"){	
				view = (
						<div className="loader"></div>
					);
			
		}

		return(
			<div className="auth_form">
					{this.setExistingUserForm()}
			</div>
		);
	}

};


export default AuthForm;