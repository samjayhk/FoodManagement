import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import Menu from './Menu'

import Home from './Home'
import Users from './Users'
import Foods from './Foods'
import Upload from './Upload'
import Searchs from './Searchs'
import Details from './Details'

import styles from './styles.css'

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			menu: '',
			width: '0%',
			progress: 'hidden',
			notification: ''
		};
		
		this.handleProgress = this.handleProgress.bind(this);
	}
	
	handleMenu = event => {
		event.preventDefault()
		this.setState({
			menu: <Menu handleCancel={this.handleCancel}/>
		})
	}
	
	handleCancel = event => {
		event.preventDefault()
		this.setState({
			menu: ''
		})
	}
	
	handleProgress = (width) => {
		if (0 < width && width < 100) {
			this.setState({progress: 'visible', width: width + '%'})
		} else if (width == 100) {
			this.setState({width: '100%'},() => {
				const objThis  = this;
				setTimeout(function() {
				  objThis.setState({ progress: 'hidden', width: '0%' })
				}, 500)
			})
		}
	}
	
	handleNotification = (message) => {
			const objThis  = this;
			this.setState({notification: <div className={styles.snackbar_container}><div className={styles.snackbar}>{message}</div></div>})
			setTimeout(function() {
				objThis.setState({ notification: '' });
			}, 3000);
	}

  render() {
	const Homes = (props) => {
      return (
        <Home
          handleProgress={this.handleProgress}
		  handleNotification={this.handleNotification}
        />
      );
    }
	  
	const Items = (props) => {
      return (
        <Foods
          handleProgress={this.handleProgress}
		  handleNotification={this.handleNotification}
        />
      );
    }
	  
	const Uploads = (props) => {
      return (
        <Upload 
          handleProgress={this.handleProgress}
		  handleNotification={this.handleNotification}
        />
      );
    }
	
	const Search = (props) => {
	  return (
		<Searchs
		  handleProgress={this.handleProgress}
		  handleNotification={this.handleNotification}
		/>
	  );
	}
		
	const User = (props) => {
	  return (
		<Users
		  handleProgress={this.handleProgress}
		  handleNotification={this.handleNotification}
		/>
	  );
	}
	
	const Detail = (props) => {
	  return (
		<Details {...props} 
		handleProgress={this.handleProgress}
		handleNotification={this.handleNotification} />
	  );
	}
	
    return (
		<>
		<Router>
		<>
		<div className={styles.progress}>
				<div className={`${styles.progress_bar} ${styles.progress_bar_striped} ${styles.bg_success} ${styles.progress_bar_animated}`} style={{ width: this.state.width, visibility: this.state.progress }} ></div>
		</div>
		{this.state.notification}
		{this.state.menu}
		<div className={styles.nav}>
			<Link to="/" className={styles.logo}>
				<div className={styles.logo_big}>
					Food
				</div>
				<div className={styles.logo_small}>
					Management
				</div>
			</Link>
			<div className={styles.nav_list_menu}>
				<Link to="/" className={styles.nav_item}>
					Home
				</Link>
				<Link to="/item" className={styles.nav_item}>
					Item
				</Link>
				<Link to="/upload" className={styles.nav_item}>
					Upload
				</Link>
				<Link to="/me" className={styles.nav_item}>
					Me
				</Link>
			</div>
			<div className={styles.nav_list_special}>
				<Link to="/search" className={`${styles.nav_item} ${styles.s}`}>
					Search
				</Link>
			</div>
			<div className={styles.menu} onClick={this.handleMenu}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" aria-labelledby="title">
					<rect className={styles.svgfill} width="50" height="50"/>
					<path className={styles.svgfill_white} d="M0,0V50H50V0ZM7.53,19H41.78v3.42H7.53ZM42.47,31h-24V27.57h24Z"/>
				</svg>
			</div>
		</div>
		
		<Route exact path="/" render={Homes} />
		<Route exact path="/item" render={Items} />
		<Route exact path="/upload" render={Uploads} />
		<Route exact path="/search" render={Search} />
		<Route exact path="/me" render={User} />
		<Route path="/food/:id?" render={Detail} />
		</>
		</Router>
		</>
    )
  }
}

export default App