# React testing with Enzyme and chai-enzyme

This project demonstrates [React](https://facebook.github.io/react/) component
testing using [Enzyme](https://github.com/airbnb/enzyme) and
[chai-enzyme](https://github.com/producthunt/chai-enzyme).
A simple pair of example components, `Message` and `MessageList` are used to
show what gets produced when Enzyme's shallow- and deep-rendering functions
(`shallow` and `mount`) are called. Assertions from chai-enzyme are used in a
[Mocha](https://mochajs.org) test script for each component.

## The components being tested

We're testing a simple `MessageList` component that takes an array of message
strings and produces some HTML. It's used like this:

```jsx
var messageList = [
  'Test message',
  'Another test message',
  'Yet another test message'
];
<MessageList messageList={messageList} />
```

The `MessageList` makes use of another component, `Message`, to render the HTML
for individual messages in its list. The component hierarchy can be
thought of according to this JSX pseudo-code:

```jsx
// Conceptual model only!
<MessageList>
  <Message message="Test message" />
  <Message message="Another test message" />
  <Message message="Yet another test message" />
</MessageList>
```

In the end, it renders the following HTML:

```jsx
<div class="message-list">
  <div class="message">Test message</div>
  <div class="message">Another test message</div>
  <div class="message">Yet another test message</div>
</div>
```

## Deep vs shallow rendering of components

When testing `MessageList`, we have a choice of how to deal with its child
components: we can perform a full DOM rendering, meaning that the all `Message`
components are rendered as DOM nodes in addition to the `MessageList` itself;
or we can use shallow rendering, which only renders DOM nodes for the
`MessageList` and leaves its `Message` child components as stubs.

Whereas the full DOM rendering looks like this,

```jsx
<MessageList messageList={{...}}>
  <div className="message-list">
    <Message message="Test message">
      <div className="message">Test message</div>
    </Message>
    <Message message="Another test message">
      <div className="message">Another test message</div>
    </Message>
    <Message message="Yet another test message">
      <div className="message">Yet another test message</div>
    </Message>
  </div>
</MessageList>
```
the shallow rendering only creates the `<div className="message-list">` element
and leaves each `Message` component unrendered.

```jsx
<MessageList messageList={{...}}>
  <div className="message-list">
    <Message message="Test message" />
    <Message message="Another test message" />
    <Message message="Yet another test message" />
  </div>
</MessageList>
```

## How we can write tests

When doing full DOM rendering, we can write assertions in terms of CSS selectors
like `.message`, which will find the `<div className="message">` element
rendered by the `Message` child component. For example:

```jsx
it('contains message divs when deep-rendered', () => {
  const component = mount(<MessageList messageList={messageList} />);
  expect(component.find('.message')).to.have.length(3);
  expect(component.find('.message').at(0)).to.have.text('Test message');
  expect(component.find('.message').at(1)).to.have.text('Another test message');
  expect(component.find('.message').at(2)).to.have.text('Yet another test message');
});
```

But when we use shallow rendering, these DOM nodes are unavailable:

```jsx
it('does not contain message divs when deep-rendered', () => {
  const component = shallow(<MessageList messageList={messageList} />);
  expect(component.find('.message')).to.have.length(0);
});
```

Instead, we can find the component stub instances and make assertions about
their properties. This is similar to traditional units tests where we mock
object dependencies and check that their methods are called with the correct
arguments. Testing that each `Message` component renders the correct DOM nodes
is better done in unit tests for `Message` rather than the `MessageList` test,
which should ideally be testing the `MessageList` component in isolation.

```jsx
it('renders the message list', () => {
  const component = shallow(<MessageList messageList={messageList} />);
  expect(component).to.have.className('message-list');
  expect(component.find(Message)).to.have.length(3);
  expect(component.find(Message).at(0)).to.have.prop('message', 'Test message');
  expect(component.find(Message).at(1)).to.have.prop('message', 'Another test message');
  expect(component.find(Message).at(2)).to.have.prop('message', 'Yet another test message');
});
```
