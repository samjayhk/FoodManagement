import React, { Component } from 'react'
import { graphql, QueryRenderer, createFragmentContainer } from 'react-relay'
import environment from '../Environment'

import {LoginMutation} from './mutation/LoginMutation'
import {RegisterMutation} from './mutation/RegisterMutation'
import User from './fragments/User'

import styles from './styles.css'

class Users extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			code: '852',
			mobile: '',
			password: '',
			current: 0, currentName: 'Login Details'
		};
	}
	
	handleChange = event => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		this.setState({
		  [name]: value
		});
	};
	
	handleChangeForm = event => {
		event.preventDefault()
		switch (this.state.current) {
			case 0:
				this.setState({currentName: 'Register Details', current: 1})
				break
			case 1: 
				this.setState({currentName: 'Login Details', current: 0})
				break
			default:
				break
		}
	}
	
	handleSubmit = (event) => {
		event.preventDefault()
		this.props.handleProgress(50)
		switch (this.state.current) {
			case 0:
				LoginMutation(this.state.code + '-' + this.state.mobile, this.state.password).then((response) => {
					if (response.login.result.result == 'true') {
						this.setState({currentName: 'Login Details', current: 0})
						this.props.handleProgress(100)
						this.props.handleNotification('Welcome back!')
					} else {
						this.props.handleNotification('Mobile or Password incorrect or not exist!')
					}
				})
				break
			case 1: 
				RegisterMutation(this.state.code + '-' + this.state.mobile, this.state.password).then((response) => {
					if (response.registration.result.result == 'true') {
						this.setState({currentName: 'Login Details', current: 0})
						this.props.handleProgress(100)
						this.props.handleNotification('Successfully!')
					} else {
						this.props.handleNotification('Mobile already exist!')
					}
				})
				break
			default:
				break
		}
	}
	
	handleLogout = event => {
		event.preventDefault()
		localStorage.removeItem('food-token')
		this.forceUpdate()
	}

  render() {
    return (
	<>
	{(() => {
		 if (typeof(Storage) !== "undefined") {
			if (localStorage.getItem('food-token') == null) {
				return (
				<>
				 <div className={styles.user_container}>
					<div className={styles.user_form_container}>
						<form className={styles.from_container} onSubmit={this.handleSubmit}>
							<div className={styles.form_title}>
								{this.state.currentName}
							</div>
							<div className={styles.from_input_container_line}>
								<div className={styles.form_input_contanier_small}>
									<label>Code</label>
									<input type="number" name="code" value={this.state.code} onChange={this.handleChange} placeholder="852" />
								</div>
								<div className={styles.form_input_contanier}>
									<label>Mobile Number</label>
									<input type="number" name="mobile" placeholder="98761234" value={this.state.mobile}  onChange={this.handleChange} />
								</div>
							</div>
							<div className={styles.form_input_contanier}>
								<label>Password</label>
								<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} />
							</div>
							<input type="submit" value="Submit" />
							<input type='button' onClick={this.handleChangeForm} value='No Account? Register Now!'/>
						</form>
					</div>
				 </div>
				</>
			  )
			} else {
				return (
				  <>
					 <div className={styles.user_container}>
						<div className={styles.user_form_container}>
							<form className={styles.from_container} onSubmit={this.handleLogout}>
								<div className={styles.form_title}>
									User Details
								</div>
								<QueryRenderer
									environment={environment}
									query={graphql`
									  query UsersQuery {
										userLibrary {
											usersConnection {
												edges {
													...User
												}
											}
										}
									  }
									  `}
									render={ ({ error, props }) => {
										if (props) {
											try {
												return <User data={props.userLibrary.usersConnection.edges} />
											} catch (e) {
												this.props.handleNotification('Something went wrong!')
											}
										}
										return ''
									}}
								  />
								<input type="submit" value="Logout" />
							</form>
						</div>
					 </div>
				  </>
				)
			}
		}
	  })()}
	  </>
    )
  }
}

export default Users