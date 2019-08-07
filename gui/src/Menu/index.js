import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import styles from './styles.css'

class Menu extends Component {
	constructor(props) {
		super(props);

	}
	
  render() {
    return (
		<div className={styles.menu}>
			<div className={styles.menu_cancel} onClick={(e) => this.props.handleCancel(e)}>
				<svg width="64" version="1.1" height="64" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
					<path fill="rgb(166,124,0)" d="M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59   c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59   c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0   L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z"/>
				</svg>
			</div>
			<div className={styles.menu_container}>
				<div className={styles.menu_item_container} onClick={this.props.handleCancel} >
					<Link to="/" className={styles.nav_item}>
						Home
					</Link>
					<Link to="/item"  className={styles.nav_item}>
						Item
					</Link>
					<Link to="/upload" className={styles.nav_item}>
						Upload
					</Link>
					<Link to="/search" className={styles.nav_item}>
						Search
					</Link>
					<Link to="/me" className={styles.nav_item}>
						Me
					</Link>
				</div>
			</div>
		</div>
    )
  }
}

export default Menu