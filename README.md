# mucus

Mucus is a package that can monitor target element for child elements
being added or removed using MutationObservers.


[![NPM](https://nodei.co/npm/mucus.png)](https://nodei.co/npm/mucus/)

[![Build Status](https://img.shields.io/travis/DamonOehlman/mucus.svg?branch=master)](https://travis-ci.org/DamonOehlman/mucus) 

## Example Usage

```js
var mucus = require('mucus');
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

```

## License(s)

### ISC

Copyright (c) 2015, Damon Oehlman <damon.oehlman@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
