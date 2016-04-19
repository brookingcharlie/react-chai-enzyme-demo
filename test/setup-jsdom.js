import jsdom from 'jsdom';

jsdom.env({
  html: '<html><body></body></html>',
  done: function(errors, window) {
    global.window = window;
    global.document = window.document;
    global.navigator = window.navigator;
  }
});
