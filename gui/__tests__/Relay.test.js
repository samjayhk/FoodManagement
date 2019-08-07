import React from 'react';
import { configure, shallow, mount } from 'enzyme'
import { wait, render } from 'react-testing-library';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { queryMock } from '../__testUtils__/queryMock';

import User from '../src/Users/fragments/User'
import Item from '../src/Foods/fragment/Item'
import Food from '../src/Home/fragment/Food'
import Search from '../src/Searchs/fragments/Search'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

jest.mock('react-relay');

describe(`Relay Modern Test`, () => {
	
	it('UsersQuery should be working well with fragment', async () => {
		
		queryMock.mockQuery({
		  name: 'UsersQuery',
		  data: {
			userLibrary: {
				usersConnection: {
					edges: {
						...User
					}
				}
			}
		  }
		});
	
		const data = [{node: {
			id: (Math.floor(Math.random() * 1000000000)).toString(),
			mobile: '852-12345678',
			reg: '1545288139000',
			last: '1545288139000'
		}}]
	
		const wrapper = shallow(<Router><User data={data} /></Router>)
	})
	
	it('FoodQuery should be working well with fragment', async () => {
		
		queryMock.mockQuery({
		  name: 'FoodsQuery',
		  data: {
			foodLibrary: {
				foodsConnection: {
					edges: {
						...Item
					}
				}
			}
		  }
		});
	
		const data = [{node: {
			id: (Math.floor(Math.random() * 1000000000)).toString(),
			name: 'apple',
			type: 'fruit',
			expiry: '1545288139000',
			cover: 'apple.jpg',
			keywords: 'apple, fruit',
			days: '3',
			create: '1545288139000'
		}}]
	
		const wrapper = render(<Router><Item data={data} /></Router>)
		await wait(() => wrapper.getByText('apple'));
		expect(wrapper.queryByText('apple')).toBeTruthy();
	})
	
	it('ExpiryQuery should be working well with fragment', async () => {
		
		queryMock.mockQuery({
		  name: 'LastExpiryQuery',
		  data: {
			expiry: {
				foodsConnection: {
					edges: {
						...Food
					}
				}
			}
		  }
		});
	
		const data = [{node: {
			id: (Math.floor(Math.random() * 1000000000)).toString(),
			name: 'apple',
			type: 'fruit',
			expiry: '1545288139000',
			cover: 'apple.jpg',
			keywords: 'apple, fruit',
			days: '3'
		}}]
	
		const wrapper = render(<Router><Food data={data} /></Router>)
		await wait(() => wrapper.getByText('apple'));
		expect(wrapper.queryByText('apple')).toBeTruthy();
	})
	
	it('SearchQuery should be working well with fragment', async () => {
		
		queryMock.mockQuery({
		  name: 'SearchsQuery',
		  variables: {
			keywords: ['apple']
		  },
		  data: {
			search: {
				foodsConnection: {
					edges: {
						...Search
					}
				}
			}
		  }
		});
	
		const data = [{node: {
			id: (Math.floor(Math.random() * 1000000000)).toString(),
			name: 'apple',
			type: 'fruit',
			expiry: '1545288139000',
			cover: 'apple.jpg',
			keywords: 'apple, fruit',
			days: '3'
		}}]
	
		const wrapper = render(<Router><Search data={data} /></Router>)
		await wait(() => wrapper.getByText('apple'));
		expect(wrapper.queryByText('apple')).toBeTruthy();
	})
	
})