'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _Object3D2 = require('./Object3D');

var _Object3D3 = _interopRequireDefault(_Object3D2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PositionalAudio = function (_Object3D) {
  _inherits(PositionalAudio, _Object3D);

  function PositionalAudio(props, context) {
    _classCallCheck(this, PositionalAudio);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PositionalAudio).call(this, props, context));

    var audio = _this.obj = new _three2.default.PositionalAudio(context.audioListener);
    audio.name = audio.name || _this.constructor.name;

    // fixme: r76?
    // https://github.com/mrdoob/three.js/blob/master/examples/misc_sound.html
    // context.audioLoader.load(props.url, function (buffer) {
    // r75:
    audio.load(props.url);
    audio.autoplay = true;
    audio.setLoop(true);
    audio.setVolume(0.5);
    audio.setRefDistance(10);
    // audio.setBuffer(buffer)
    // audio.play()
    // })
    return _this;
  }

  return PositionalAudio;
}(_Object3D3.default);

PositionalAudio.contextTypes = _extends({}, _Object3D3.default.contextTypes, {
  audioListener: _react.PropTypes.object.isRequired
});
PositionalAudio.propTypes = _extends({}, _Object3D3.default.propTypes, {
  url: _react.PropTypes.string.isRequired
});
exports.default = PositionalAudio;