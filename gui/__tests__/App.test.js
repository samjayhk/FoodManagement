import React from 'react';
import { configure, shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router';

import App from '../src/App.js'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })


describe(`App.js`, () => {
	const wrapper = shallow(<App />)
	 
	it('should render App', () => {
		wrapper
	})
	
	it('notification should be null', () => {
		expect(wrapper.state().notification).toEqual('');
	})
	
})