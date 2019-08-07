import React, { Component } from 'react'
import { graphql, QueryRenderer, createFragmentContainer } from 'react-relay'
import environment from '../Environment'

import Item from './fragment/Item'

const ItemContainer = ({name, create, expiry}) => {
    return (
	 <>
		<QueryRenderer
			environment={environment}
			query={graphql`
			  query ItemContainerQuery {
				foodLibrary {
					foodsConnection {
						edges {
							...Item
						}
					}
				}
			  }
			  `}
			variables={{
				name: name,
				create: create,
				expiry: expiry
			}} 
			render={ ({ error, props }) => {
				if (props) {
					try {
						return <Item data={props.foodLibrary.foodsConnection.edges} />
					} catch (e) {
						this.props.handleNotification('Something went wrong!')
					}
				}
			}}
		  />
	  </>
    )
}

export default ItemContainer