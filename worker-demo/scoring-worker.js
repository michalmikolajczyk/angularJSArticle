'use strict';

function scoringFunction(items, weights) {
  var itemsArray = [];
  for (var i = 0; i < items.length; i++) {
    // some heavy processing
    // itemsArray is populated, etc.
  }

  itemsArray.sort(function (a, b) {
    if (a.sum > b.sum) {
      return -1;
    } else if (a.sum < b.sum) {
      return 1;
    } else {
      return 0;
    }
  });

  return itemsArray;
}

self.addEventListener('message', function (e) {
  var reply = {
    ready: true
  };
  if (e.data && e.data.items && e.data.items.length) {
    reply.items = scoringFunction(e.data.items, e.data.weights);
  }
  self.postMessage(reply);
}, false);