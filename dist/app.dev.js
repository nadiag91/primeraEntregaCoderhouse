"use strict";

var _express = _interopRequireDefault(require("express"));

var _productsRouter = _interopRequireDefault(require("./src/routes/products.router.js"));

var _cartsRouter = _interopRequireDefault(require("./src/routes/carts.router.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = 8080;
app.get('/', function (req, res) {
  res.send('¡Bienvenido a la API de productos y carritos!');
});
app.use(_express["default"].json());
app.use('/api/products', _productsRouter["default"]);
app.use('/api/carts', _cartsRouter["default"]);
app.listen(PORT, function () {
  console.log("Servidor corriendo en http://localhost:".concat(8080));
});