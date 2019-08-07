import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

import AWS from 'aws-sdk'
import Amplify from 'aws-amplify'
import config from './aws-exports'
import { Auth, Hub, Logger } from 'aws-amplify'

Amplify.configure({ 
	...config
})

class AppWithAuth extends React.Component {
  
  async componentDidMount() {
	 
    try {
		await Auth.signIn('302cem', '123456aA_')
		.catch(err => console.log(err));
      const userData = await Auth.currentAuthenticatedUser()
	  global.AWS.config.credentials = await Auth.currentCredentials();
    } catch (err) {
      console.log(err)
    }
  }
  onAuthChange = e => {
    console.log('event: ', e)
  }
  render() {
    return (
	<>
      <App />
    </>
	)
  }
} 

ReactDOM.render(<AppWithAuth />, document.getElementById('app'));
