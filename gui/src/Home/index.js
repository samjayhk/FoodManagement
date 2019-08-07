import React, { Component } from 'react'
import { graphql, QueryRenderer, createFragmentContainer } from 'react-relay'
import environment from '../Environment'
import shallowequal from 'shallowequal'

import HomeExpiry from './HomeExpiry.js'
import LastExpiry from './LastExpiry.js'

import styles from './styles.css'

class Home extends Component {
	shouldComponentUpdate (nextProps, nextState) {
		return !shallowequal(this.props, nextProps) || !shallowequal(this.state, nextState);
	}
	
  render() {
    return (
	 <div className={styles.home_container}>
		<div className={styles.item_banner}>
			<HomeExpiry handleNotification={this.props.handleNotification} />
		</div>
		<div className={styles.expiring_container}>
			<div className={styles.expiring_title}>
				Expiring Food
			</div>
			<div className={styles.container}>
				<div className={styles.row}>
					<LastExpiry handleNotification={this.props.handleNotification} />
				</div>
			</div>
		</div>
	 </div>
    )
  }
}

export default Home