'use strict';

require('core-js/stable');

require('regenerator-runtime/runtime');

var _parsePost = require('./parsePost');

(0, _parsePost.parseLinks)('https://rus.delfi.ee/', '.headline__title a', 5).then(function (links) {
  (0, _parsePost.getPosts)(links).then(function (posts) {
    return console.log(posts);
  }).catch(function (e) {
    return console.log(e);
  });
}).catch(function (e) {
  return console.log(e);
});