var pluck = require('whisk/pluck');
var flatten = require('flatten-list');

/**
  # mucus

  Mucus is a package that can monitor target element for child elements
  being added or removed using MutationObservers.  Just makes it all
  a bit cleaner (ironically) to use, whose idea were NodeLists anyway...

  ## Reference

  ### ```mucus(target, listener) => fn```

  Listen to the `target` element for changes and report changes in the
  `listener` function as an aggregated changes object (see below). The
  `fn` returned from mucus to be called to stop mucus running.

  Format of changes object:

  - `added` (an array of elements added to the target)
  - `removed` (an array of elements removed fro the target)

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
