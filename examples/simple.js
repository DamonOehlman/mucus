var mucus = require('..');
var h = require('hyperscript');
var list = h('ul');
var testItem = h('li', 'A test item');

// monitor the list
var stopMonitoring = mucus(list, function(changes) {
  console.log('added: ', changes.added);
  console.log('removed: ', changes.removed);
});

// every 5s add an item to the dom and then remove it 500ms after
var timer = setInterval(function() {
  list.appendChild(testItem);
  setTimeout(list.removeChild.bind(list, testItem), 500);
}, 5000);

// stop monitoring after 30s
setTimeout(function() {
  clearInterval(timer);
}, 30000);

document.body.appendChild(list);

/*
the script should produce the following output until the timer is cleared:

simple.js:8 added:  [li]
simple.js:9 removed:  []
simple.js:8 added:  []
simple.js:9 removed:  [li]
*/
