'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

//like jquery
var parsePost = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url, elems) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _unirest2.default.get(url).then(function (response) {
              var body = response.body;
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

              console.log(post);
            });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function parsePost(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//extract domain


var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _psl = require('psl');

var _psl2 = _interopRequireDefault(_psl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = parsePost;