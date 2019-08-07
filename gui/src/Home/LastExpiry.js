import React, { Component } from 'react'
import { graphql, QueryRenderer, createFragmentContainer } from 'react-relay'
import environment from '../Environment'

import Food from './fragment/Food'

const LastExpiry = ({handleNotification}) => {
	return (
		<QueryRenderer
			environment={environment}
			query={graphql`
			  query LastExpiryQuery {
				expiry {
					foodsConnection {
						edges {
							...Food
						}
					}
				}
			  }
			  `}
			render={ ({ error, props }) => {
				if (props) {
					try {
						return <Food data={props.expiry.foodsConnection.edges} />
					} catch (e) {
						this.props.handleNotification('Something went wrong!')
					}
				}
				return ''
			}}
		  />
	)
}

export default LastExpiry