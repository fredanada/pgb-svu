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

var Mesh = function (_Object3D) {
  _inherits(Mesh, _Object3D);

  function Mesh(props) {
    var _Object$getPrototypeO;

    _classCallCheck(this, Mesh);

    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Mesh)).call.apply(_Object$getPrototypeO, [this, props].concat(rest)));

    _this.obj = props.obj || new _three2.default.Mesh(props.geometry, props.material);
    _this.obj.name = _this.obj.name || _this.constructor.name;
    return _this;
  }

  return Mesh;
}(_Object3D3.default);

Mesh.propTypes = _extends({}, _Object3D3.default.propTypes, {
  geometry: _react.PropTypes.object,
  material: _react.PropTypes.object,
  obj: _react.PropTypes.object
});
exports.default = Mesh;