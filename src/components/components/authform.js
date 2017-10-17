import React, {Component} from 'react';
var API = require('../../api_utls/api');
var GeneralStore = require('../../stores/generalstore');
import { NavLink, withRouter, Link } from 'react-router-dom';
let Actions = require('../../actions/actions');


class AuthForm extends Component {

	constructor(props){
		super(props);
		this.state ={
			userName:  null,
			userPassword: null,
			type: 'existing_user',
			status: {success: false, message: "first load"}
		};
	}

	componentDidMount(){
		// Actions.updateUserSubmitStatus({success: false, message: "first load"});
		GeneralStore.addChangeListener(this._onChange.bind(this));
	}
	
	componentWillUnmount(){
		GeneralStore.removeChangeListener(this._onChange.bind(this));
	}

	componentDidUpdate(){

		if(this.state.status.message=="Enjoy your token!"){
			this.setState({
				userName:  null,
				userPassword: null,
			});	
			console.log(this.state.status);
			this.props.history.push('userdashboard');
		}
	}
	
	_onChange(){
		this.setState({
			status: GeneralStore.getSubmitStatus()
		});

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
					<input value={this.state.userName} placeholder="Username" onChange={(e) => this.updateUserName(e)} />
					<input value={this.state.userPassword} type="password"  placeholder="Password" onChange={(e) => this.updateUserPassword(e)} />
					<button type="submit" onClick={()=> this.subitNewUser() }>	Submit </button>
					<h4 onClick={()=>{ 
						this.setViewType('existing_user');
						 Actions.updateUserSubmitStatus({success: false, message: "first load"});
					}}>Existing User?</h4>
				</div>
		);
	}


	setExistingUserForm(){
		
		return(
				<div>
					<h2>Existing User</h2>
					<input placeholder="Username" onChange={(e) => this.updateUserName(e)} />
					<input type="password"  placeholder="Password" onChange={(e) => this.updateUserPassword(e)} />
					<button 
						type="submit" 
						onClick={()=> {
							this.submitExistingUser(); 

					}}>  Submit  </button>

					<h4 onClick={()=> {
						this.setViewType('new_user');
						Actions.updateUserSubmitStatus({success: false, message: "first load"});
					}}>New User?</h4>
				</div>
		);
	}

	setWrongPasswordView(){

		return (
				<div>
					<h1>Wrong Password!!!!</h1>
					<h2>Existing User</h2>
					<input value={this.state.userName} placeholder="Username" onChange={(e) => this.updateUserName(e)} />
					<input value={this.state.userPassword} type="password"  placeholder="Password" onChange={(e) => this.updateUserPassword(e)} />
					<button 
						type="submit" 
						onClick={()=> {
							this.submitExistingUser();

					}}>  Submit  </button>
					<h4 onClick={()=> {
						this.setViewType('new_user');
						Actions.updateUserSubmitStatus({success: false, message: "first load"});
					}}>New User?</h4>
				</div>
			);
	}

	setUserDoesNotExistView(){

		return (
				<div>
					<h1>User Name does not Exist!!!!</h1>
					<h2>Existing User</h2>
					<input value={this.state.userName} placeholder="Username" onChange={(e) => this.updateUserName(e)} />
					<input value={this.state.userPassword} type="password"  placeholder="Password" onChange={(e) => this.updateUserPassword(e)} />
					<button 
						type="submit" 
						onClick={()=> {
							this.submitExistingUser(); 
					}}>  Submit  </button>
					<h4 onClick={()=> {
						this.setViewType('new_user');
						Actions.updateUserSubmitStatus({success: false, message: "first load"});
					}}>New User?</h4>
				</div>
		);
	}

	render(){
		//
		// 	<div className="loader"></div>
		//
		let view=null;
		if(this.state.status.message=="first load" && this.state.type=='existing_user') {
			view = this.setExistingUserForm();
		}
		if(this.state.status.message=="first load" && this.state.type=='new_user'){
			view = this.setNewUserFormView();
		}
		if(this.state.status.message=="Password invalid"){
			view = this.setWrongPasswordView();
		}
		if(this.state.status.message == "Authentication failed. User not found."){
			view = this.setUserDoesNotExistView();
		}
		return(
			<div className="auth_form">
					{view}
			</div>
		);
	}

};


export default AuthForm;