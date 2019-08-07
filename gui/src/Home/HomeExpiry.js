import React, { Component } from 'react'
import { graphql, QueryRenderer, createFragmentContainer } from 'react-relay'
import environment from '../Environment'

import Foods from './fragment/Foods'

const HomeExpiry = ({handleNotification}) => {
	return (
		<QueryRenderer
			environment={environment}
			query={graphql`
			  query HomeExpiryQuery {
				expiry {
					foodsConnection {
						edges {
							...Foods
						}
					}
				}
			  }
			  `}
			 variables={{
				expiry: '1'
			}} 
			render={ ({ error, props }) => {
				if (props) {
					try {
						return <Foods handleNotification={handleNotification} data={props.expiry.foodsConnection.edges} />
					} catch (e) {
						this.props.handleNotification('Something went wrong!')
					}
				}
				return ''
			}}
		  />
	)
}

export default HomeExpiry