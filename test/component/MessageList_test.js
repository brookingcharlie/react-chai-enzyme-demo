import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import MessageList from '../../src/component/MessageList'
import Message from '../../src/component/Message'

describe('MessageList', () => {
  const messageList = [
    'Test message',
    'Another test message',
    'Yet another test message'
  ];
  const jsx = <MessageList messageList={messageList} />;

  it('renders the message list', () => {
    const component = shallow(jsx);
    expect(component).to.have.className('message-list');
    expect(component.find(Message)).to.have.length(3);
    expect(component.find(Message).at(0)).to.have.prop('message', 'Test message');
    expect(component.find(Message).at(1)).to.have.prop('message', 'Another test message');
    expect(component.find(Message).at(2)).to.have.prop('message', 'Yet another test message');
  });

  it('does not contain message divs when deep-rendered', () => {
    const component = shallow(jsx);
    expect(component.find('.message')).to.have.length(0);
  });

  it('contains message divs when deep-rendered', () => {
    const component = mount(jsx);
    expect(component.find('.message')).to.have.length(3);
    expect(component.find('.message').at(0)).to.have.text('Test message');
    expect(component.find('.message').at(1)).to.have.text('Another test message');
    expect(component.find('.message').at(2)).to.have.text('Yet another test message');
  });

  it('can be shallow-rendered', () => {
    expect(shallow(jsx).debug()).to.equal(
      '<div className="message-list">\n' +
      '<Message message="Test message" />\n' +
      '<Message message="Another test message" />\n' +
      '<Message message="Yet another test message" />\n' +
      '</div>'
    );
  })

  it('can be deep-rendered', () => {
    expect(mount(jsx).debug()).to.equal(
      '<MessageList messageList={{...}}>\n' +
      '  <div className="message-list">\n' +
      '    <Message message="Test message">\n' +
      '      <div className="message">\n' +
      '        Test message\n' +
      '      </div>\n' +
      '    </Message>\n' +
      '    <Message message="Another test message">\n' +
      '      <div className="message">\n' +
      '        Another test message\n' +
      '      </div>\n' +
      '    </Message>\n' +
      '    <Message message="Yet another test message">\n' +
      '      <div className="message">\n' +
      '        Yet another test message\n' +
      '      </div>\n' +
      '    </Message>\n' +
      '  </div>\n' +
      '</MessageList>'
    );
  })
});
