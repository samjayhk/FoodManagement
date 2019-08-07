import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import {
  graphql,
  createFragmentContainer
} from 'react-relay';

import styles from '../styles.css'

class Foods extends Component {
	render () {
	   return (
		 <>
			{(() => {
				if (this.props.data != null) {
					if (this.props.data.length > 0) {
						return (
							<div className={styles.item_banner_background}>
								<div className={styles.item_banner_container}>
									<div className={styles.item_banner_layer}>
										<div className={styles.item_banner_title}>
											{this.props.data[0].node.name}
										</div>
										<div className={styles.item_banner_expiry}>
											{this.props.data[0].node.days} days remaining
										</div>
										<div className={styles.expiry_button_container}>
											<Link className={styles.expiry_button} to={'/food/' + this.props.data[0].node.id}>Details</Link>
										</div>
									</div>
								</div>
								<div className={styles.item_banner_cover_container}>
									<img src={'https://s3.amazonaws.com/foodmanagementd55f6622a99f4e8d855baba9a6b1a41a/public/' + this.props.data[0].node.cover} />
								</div>
							</div>
						)
					} else if (this.props.data.node == undefined) {
						this.props.handleNotification('Nothing record found.')
					} 
				} else {
					this.props.handleNotification('Token session expired, please login again.')
				}
			})()}
		 </>
	   )
	}
}

Foods = createFragmentContainer(
  Foods,
  graphql`
    fragment Foods on FoodEdge @relay(plural: true) {
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

export default Foods