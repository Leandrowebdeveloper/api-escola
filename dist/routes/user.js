"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _AuthMiddleware = require('../middlewares/AuthMiddleware'); var _AuthMiddleware2 = _interopRequireDefault(_AuthMiddleware);
const router = new (0, _express.Router)();

router.get('/', _AuthMiddleware2.default, _UserController2.default.index);
router.get('/:id', _AuthMiddleware2.default, _UserController2.default.show);

router.post('/', _AuthMiddleware2.default, _UserController2.default.store);
router.put('/', _AuthMiddleware2.default, _UserController2.default.update);
router.delete('/', _AuthMiddleware2.default, _UserController2.default.destroy);

exports. default = router;
