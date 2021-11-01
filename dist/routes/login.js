"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _express = require('express');
var _LoginController = require('../controllers/LoginController'); var _LoginController2 = _interopRequireDefault(_LoginController);
const router = new (0, _express.Router)();

router.post('/', _LoginController2.default.logged)

exports. default = router;
