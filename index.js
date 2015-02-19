var pluck = require('whisk/pluck');
var flatten = require('flatten-list');

/**
  # mucus

  Mucus is a package that can monitor target element for child elements
  being added or removed using MutationObservers.

  ## Example Usage

  <<< examples/simple.js

**/

module.exports = function(target, listener) {
  var observer = new MutationObserver(handleMutations);

  function handleMutations(records) {
    listener({
      added: flatten(records.map(pluck('addedNodes'))),
      removed: flatten(records.map(pluck('removedNodes')))
    });
  }

  observer.observe(target, {
    attributes: false,
    childList: true,
    characterData: false
  });

  return observer.disconnect.bind(observer);
};
