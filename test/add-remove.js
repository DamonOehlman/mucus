var test = require('tape');
var h = require('hyperscript');
var mucus = require('..');
var list;
var testItem;

test('create a list and inject into the dom', function(t) {
  t.plan(2);
  t.ok(list = h('ul'));
  document.body.appendChild(list);
  t.ok(list.parentNode);
});

test('create a testitem', function(t) {
  t.plan(1);
  t.ok(testItem = h('li', 'test item'));
});

test('add the test item to the list and watch mucus', function(t) {
  var stop;

  t.plan(3);
  stop = mucus(list, function(changes) {
    t.equal(changes.added.length, 1);
    t.deepEqual(changes.added, [testItem]);
    t.equal(changes.removed.length, 0);

    // stop observing
    stop();
  });

  list.appendChild(testItem);
});

test('remove the test item from the list and watch mucus', function(t) {
  var stop;

  t.plan(3);
  stop = mucus(list, function(changes) {
    t.equal(changes.removed.length, 1);
    t.deepEqual(changes.removed, [testItem]);
    t.equal(changes.added.length, 0);

    // stop observing
    stop();
  });

  list.removeChild(testItem);
});
