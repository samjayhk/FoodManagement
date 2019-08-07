import React, { Component } from 'react';

import { Storage, API, graphqlOperation } from 'aws-amplify'
import { Link } from 'react-router-dom'

import {
  graphql,
  createFragmentContainer
} from 'react-relay';

import styles from './styles.css'

class Item extends Component {
	render () {
	   return (
		 <>
			{(() => {
				if (this.props.data != null) {
					var sortedResult = undefined
					if (this.props.name !== undefined) {
						if (this.props.name == 1) {
							sortedResult = this.props.data.map((data) => 
								data.node
							).sort(function(a, b) {
								return a.name > b.name ? 1:-1
							})
						} else {
							sortedResult = this.props.data.map((data) => 
								data.node
							).sort(function(a, b) {
								return b.name > a.name ? 1:-1
							})
						}
					} else if (this.props.create !== undefined) {
						if (this.props.create == 1) {
							sortedResult = this.props.data.map((data) => 
								data.node
							).sort(function(a, b) {
								return a.create > b.create ? 1:-1
							})
						} else {
							sortedResult = this.props.data.map((data) => 
								data.node
							).sort(function(a, b) {
								return b.create > a.create ? 1:-1
							})
						}
					} else if (this.props.expiry !== undefined) {
						if (this.props.expiry == 1) {
							sortedResult = this.props.data.map((data) => 
								data.node
							).sort(function(a, b) {
								return a.expiry > b.expiry ? 1:-1
							})
						} else {
							sortedResult = this.props.data.map((data) => 
								data.node
							).sort(function(a, b) {
								return b.expiry > a.expiry ? 1:-1
							})
						}
					} else {
						sortedResult = this.props.data.map((data) => 
							data.node
						).sort(function(a, b) {
							return b.create > a.create ? 1:-1
						})
					}
					
					return (
						sortedResult.map((data, key) => 
							<div key={key} className={styles.col_sm_4}>
								<div className={styles.expiry_box_container}>
									<div className={styles.expiry_cover_container}>
										<img className={styles.expiry_cover} src={'https://s3.amazonaws.com/foodmanagementd55f6622a99f4e8d855baba9a6b1a41a/public/' + data.cover} />
									</div>
									<div className={styles.expiry_name}>
										{data.name}
									</div>
									<div className={styles.expiry_date}>
										{data.days} days remaining
									</div>
									<div className={styles.expiry_button_container}>
										<Link className={styles.expiry_button} to={'/food/' + data.id}>Details</Link>
									</div>
								</div>
							</div>
						)
					)
			}
			})()}
		 </>
	   )
	}
}

Item = createFragmentContainer(
  Item,
  graphql`
    fragment Item on FoodEdge @relay(plural: true) {
			node {
				id
				name
				type
				expiry
				cover
				keywords
				days
				create
			}
	}
  `
)

export default Item