import Profile from './components/Profile';
import React from 'react';
import { shallow } from 'enzyme';
import client from './Client';

jest.mock('./Client');

describe('App', () => {
  let wrapper;
  const onSubmit = jest.fn(); 

  beforeEach(() => {
    wrapper = shallow(
      <Profile 
        onSubmit={onSubmit}
      />
    );
  });

  it('should have a `submit button`', () => {
    expect(
     wrapper.contains(<button type='submit' disabled={true} className='ui button'>Submit</button>)
    ).toBe(true);
  });

});
