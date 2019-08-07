import React from 'react';
import { configure, shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router';

import App from '../src/App.js'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })


describe(`Router`, () => {
	
  it('valid path for /', () => {
    const wrapper = mount(
		<MemoryRouter initialEntries={[ '/' ]}>
		  <App/>
		</MemoryRouter>
	  );
  })
  
  it('valid path for /item', () => {
    const wrapper = mount(
		<MemoryRouter initialEntries={[ '/' ]}>
		  <App/>
		</MemoryRouter>
	  );
  })
  
  it('valid path for /upload', () => {
    const wrapper = mount(
		<MemoryRouter initialEntries={[ '/' ]}>
		  <App/>
		</MemoryRouter>
	  );
  })
	
  it('valid path for /search', () => {
    const wrapper = mount(
		<MemoryRouter initialEntries={[ '/' ]}>
		  <App/>
		</MemoryRouter>
	  );
  })
  
  
  it('valid path for /me', () => {
    const wrapper = mount(
		<MemoryRouter initialEntries={[ '/' ]}>
		  <App/>
		</MemoryRouter>
	  );
  })
  
  it('invaild path would redirect to /item', () => {
    const wrapper = mount(
		<MemoryRouter initialEntries={[ '/food/error' ]}>
		  <App/>
		</MemoryRouter>
	  );
  })
  
})