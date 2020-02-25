'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPosts = exports.parseLinks = exports.parsePost = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var parseLinks = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, className) {
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _promise2.default(function (resolve, reject) {
              var links = [];
              _unirest2.default.get(url).end(function (_ref3) {
                var body = _ref3.body,
                    error = _ref3.error;

                if (error) reject(error);

                var $ = _cheerio2.default.load(body);

                $(className).each(function (_, e) {
                  if (_ + 1 <= max) links.push($(e).attr('href'));
                });
                console.log(links);
              });
              delay(2000);
              resolve(links);
              if (!links.length) reject({ error: 'empty' });
            });

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function parseLinks(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getPosts = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(links) {
    var _this = this;

    var posts, i, post;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            posts = [];
            i = 0;

          case 2:
            if (!(i < links.length)) {
              _context3.next = 12;
              break;
            }

            _context3.next = 5;
            return parsePost(links[i], _config.elems.delfi).then(function (post) {
              return post;
            });

          case 5:
            post = _context3.sent;

            posts.push(post);
            _context3.next = 9;
            return delay(1000);

          case 9:
            i++;
            _context3.next = 2;
            break;

          case 12:
            return _context3.abrupt('return', new _promise2.default(function () {
              var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(resolve, reject) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        resolve(posts);
                        if (!posts.length) reject({ error: 'No news' });

                      case 2:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x5, _x6) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getPosts(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _psl = require('psl');

var _psl2 = _interopRequireDefault(_psl);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//extract domain
var delay = function delay(ms) {
  return new _promise2.default(function (r) {
    return setTimeout(r, ms);
  });
};
//like jquery


function parsePost(url, elems) {
  return new _promise2.default(function (resolve, reject) {
    _unirest2.default.get(url).end(function (_ref) {
      var body = _ref.body,
          error = _ref.error;

      var $ = _cheerio2.default.load(body);

      var title = $(elems.title).text().trim();

      var image = $(elems.image).attr('src');
      image = image.indexOf('http') >= 0 ? image : _psl2.default.get(url) + image;
      var description = $(elems.text).text().trim();

      var post = {
        title: title,
        image: image,
        text: description
      };
      if (error) reject(error);

      resolve(post);
    });
  });
}

exports.parsePost = parsePost;
exports.parseLinks = parseLinks;
exports.getPosts = getPosts;