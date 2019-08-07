import React, { Component } from 'react'
import { graphql, QueryRenderer, createFragmentContainer } from 'react-relay'
import environment from '../Environment'
import shallowequal from 'shallowequal'

import Item from './fragment/Item'

import styles from './styles.css'

class Foods extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: undefined,
			create: undefined,
			expiry: undefined
		};
	}
	
	shouldComponentUpdate (nextProps, nextState) {
		return !shallowequal(this.props, nextProps) || !shallowequal(this.state, nextState);
	}
	
	handleSort = (id) => {
		switch(id) {
			case 0:
				this.setState({
					name: this.state.name == -1 ? 1 : -1,
					create: undefined,
					expiry: undefined
				})
				break
			case 1:
				this.setState({
					create: this.state.create == -1 ? 1 : -1,
					name: undefined,
					expiry: undefined
				})
				break
			case 2:
				this.setState({
					expiry: this.state.expiry == -1 ? 1 : -1,
					name: undefined,
					create: undefined
				})
				break
			default:
				break
		} 
	}
	
  render() {
    return (
	<>
	<div className={styles.item_bar}>
		<div className={styles.item_bar_container}>
			<div className={styles.item_bar_item} onClick={() => this.handleSort(0)}>
				Name {this.state.name == 1 ? '▲' : '▼'}
			</div>
			<div className={styles.item_bar_item} onClick={() => this.handleSort(1)}>
				Create {this.state.create == 1 ? '▲' : '▼'}
			</div>
			<div className={styles.item_bar_item} onClick={() => this.handleSort(2)}>
				Expiry {this.state.expiry == 1 ? '▲' : '▼'}
			</div>
		</div>
	</div>
	 <div className={styles.item_container}>
		<div className={styles.item_container}>
			<div className={styles.container}>
				<div className={styles.row}>
					<QueryRenderer
						environment={environment}
						query={graphql`
						  query FoodsQuery {
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
							name: this.state.name,
							create: this.state.create,
							expiry: this.state.expiry
						}} 
						render={ ({ error, props }) => {
							if (props) {
								try {
									return <Item data={props.foodLibrary.foodsConnection.edges} name={this.state.name} create={this.state.create} expiry={this.state.expiry} />
								} catch (e) {
									this.props.handleNotification('Something went wrong!')
								}
							}
							return ''
						}}
					  />
				</div>
			</div>
		</div>
	 </div>
	 </>
    )
  }
}

export default Foods