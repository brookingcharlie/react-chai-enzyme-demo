import React from 'react'
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Message from '../../src/component/Message'

describe('Message', () => {
  it('renders the message', () => {
    const component = shallow(<Message message="Hello, world!" />);
    expect(component).to.have.className('message');
    expect(component).to.have.text('Hello, world!');
  });
});
