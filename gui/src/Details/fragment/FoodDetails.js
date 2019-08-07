import React, { Component } from 'react'
import { Storage, API, graphqlOperation } from 'aws-amplify'
import { Redirect } from "react-router-dom";

import {
  graphql,
  createFragmentContainer
} from 'react-relay'

import {ModifyFoodMutation} from '../mutation/ModifyFoodMutation'
import {RemoveFoodMutation} from '../mutation/RemoveFoodMutation.js'

import styles from './styles.css'

class FoodDetails extends Component {
	constructor(props) {
		super(props)
		props.data != null ? props.handleProgress(100) : ''
		this.state = {
			id: props.data != null ? props.data[0].node.id : '',
			name: props.data != null ? props.data[0].node.name : '',
			type: props.data != null ? props.data[0].node.type : '',
			expiry: props.data != null ? new Date(parseInt(props.data[0].node.expiry)).toISOString().slice(0,10) : '',
			keywords: props.data != null ? props.data[0].node.keywords : '',
			cover: props.data != null ? props.data[0].node.cover : '',
			redirect: props.data == null ? true : false
		}
	}
	
	handleChange = event => {
		const target = event.target
		const name = target.name.toLowerCase()
		const value = target.value.toLowerCase()
		this.setState({currentEnable: false})
		this.setState({
		  [name]: value
		})
	}
	
	handleModify = event => {
		this.props.handleProgress(50)
		ModifyFoodMutation(this.state.id, this.state.name.toLowerCase(), this.state.type.toLowerCase(), new Date (this.state.expiry).getTime().toString(), this.state.keywords).then((response) => {
			if (response.modifyFood.result.result == 'true') {
				this.props.handleNotification('Successfully!')
				this.props.handleProgress(100)
			} else {
				this.props.handleNotification('Something went wrong!')
				this.props.handleProgress(100)
			}
		})
	}
	
	handleRemove = event => {
		this.props.handleProgress(50)
		RemoveFoodMutation(this.state.id).then((response) => {
			if (response.removeFood.result.result == 'true') {
				Storage.remove(this.state.cover)
				this.props.handleNotification('Successfully!')
				this.props.handleProgress(100)
				this.setState({redirect: true})
			} else {
				this.props.handleNotification('Something went wrong!')
				this.props.handleProgress(100)
			}
		})
	}
	
	render () {
		if(this.state.redirect){
			this.props.handleNotification('Food doesnt exist or already removed!')
			this.props.handleProgress(100)
			return (
				<Redirect to="/item" />
			);
		}
		return (
		 <>
			{(() => {
			if (this.props.data != null) {
				return (
					<div className={styles.details_container}>
						<div className={styles.details_cover}>
							<img src={'https://s3.amazonaws.com/foodmanagementd55f6622a99f4e8d855baba9a6b1a41a/public/' + this.state.cover} />
						</div>
						<div className={styles.details_information}>
							<div className={styles.details_input}>
								<label>Food Name</label>
								<input type='text' value={this.state.name} name='name' onChange={this.handleChange} />
								<label>Food Type</label>
								<input type='text' value={this.state.type} name='type' onChange={this.handleChange} />
								<label>Food Expiry</label>
								<input type='date' value={this.state.expiry} name='expiry' onChange={this.handleChange} />
								<label>Food Keywords</label>
								<input type='text' value={this.state.keywords} name='keywords' onChange={this.handleChange} />
							</div>
							<button className={styles.details_button} onClick={this.handleModify}>Modify</button>
							<button className={styles.details_button} onClick={this.handleRemove}>Delete</button>
						</div>
					</div>
				)
			}
			})()}
		 </>
	   )
	}
}

FoodDetails = createFragmentContainer(
  FoodDetails,
  graphql`
    fragment FoodDetails on FoodEdge @relay(plural: true) {
			node {
				id
				name
				type
				expiry
				cover
				keywords
				days
			}
	}
  `
)

export default FoodDetails