import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import {
  graphql,
  createFragmentContainer
} from 'react-relay';

import styles from './styles.css'

class Food extends Component {
	render () {
	   return (
		 <>
			{(() => {
				if (this.props.data != null) {
					return (
						this.props.data.map((data, key) => 
							<div key={key} className={styles.col_sm_4}>
								<div className={styles.expiry_box_container}>
									<div className={styles.expiry_cover_container}>
										<img className={styles.expiry_cover} src={'https://s3.amazonaws.com/foodmanagementd55f6622a99f4e8d855baba9a6b1a41a/public/' + data.node.cover} />
									</div>
									<div className={styles.expiry_name}>
										{data.node.name}
									</div>
									<div className={styles.expiry_date}>
										{data.node.days} days remaining
									</div>
									<div className={styles.expiry_button_container}>
										<Link className={styles.expiry_button} to={'/food/' + data.node.id}>Details</Link>
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

Food = createFragmentContainer(
  Food,
  graphql`
    fragment Food on FoodEdge @relay(plural: true) {
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

export default Food