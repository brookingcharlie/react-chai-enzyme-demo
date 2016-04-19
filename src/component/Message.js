import React from 'react';

var Message = React.createClass({
  propTypes: {
    message: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="message">
        {this.props.message}
      </div>
    );
  }
});

module.exports = Message;
