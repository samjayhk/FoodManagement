import React, { Component } from 'react';

import {
  graphql,
  createFragmentContainer
} from 'react-relay';

import { ConnectionHandler } from 'relay-runtime'
import styles from '../styles.css'

class User extends Component {
	render () {
	   return (
		 <div>
			{(() => {
				if (this.props.data != null) {
					return (
						this.props.data.map((data, key) => (
							<>
							<div key={key} className={styles.from_input_container_line}>
								<div className={styles.form_input_contanier_small}>
									<label>Code</label>
									<input type="text" name="code" value={data.node.mobile.split('-')[0]} readOnly />
								</div>
								<div className={styles.form_input_contanier}>
									<label>Mobile Number</label>
									<input type="text" name="mobile" value={data.node.mobile.split('-')[1]} readOnly />
								</div>
							</div>
							<div key={key} className={styles.form_input_contanier}>
								<label>Register Date</label>
								<input type="text" name="reg" value={new Date(parseInt(data.node.reg)).toString().split(' GMT')[0]} readOnly />
							</div>
							<div key={key} className={styles.form_input_contanier}>
								<label>Last Login Date</label>
								<input type="text" name="last" value={new Date(parseInt(data.node.last)).toString().split(' GMT')[0]} readOnly />
							</div>
							</>
							)
						)
					)
				}
			})()}
		 </div>
	   )
	}
}

User = createFragmentContainer(
  User,
  graphql`
    fragment User on UserEdge @relay(plural: true) {
			node {
				id
				mobile
				reg
				last
			}
	}
  `
)

export default User