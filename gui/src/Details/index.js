import React, { Component } from 'react'
import { graphql, QueryRenderer, createFragmentContainer } from 'react-relay'
import environment from '../Environment'
import shallowequal from 'shallowequal'

import FoodDetails from './fragment/FoodDetails'

class Details extends Component {
	constructor(props) {
		super(props)
		props.handleProgress(40)
		this.state = {
			
		}
	}
	
	shouldComponentUpdate (nextProps, nextState) {
		return !shallowequal(this.props, nextProps) || !shallowequal(this.state, nextState);
	}
	
  render() {
    return (
		<>
		<QueryRenderer
				environment={environment}
				query={graphql`
				  query DetailsQuery($id: String!) {
					selectFood {
						foodsConnection(id: $id) {
							edges {
								...FoodDetails
							}
						}
					}
				  }
				  `}
				variables={{
					id: this.props.match.params.id,
				}} 
				render={ ({ error, props }) => {
					if (props) {
						try {
							return <FoodDetails handleProgress={this.props.handleProgress} handleNotification={this.props.handleNotification} data={props.selectFood.foodsConnection.edges} />
						} catch (e) {
							this.props.handleNotification('Something went wrong!')
						}
					}
					return ''
				}}
			  />
		</>
    )
  }
}

export default Details