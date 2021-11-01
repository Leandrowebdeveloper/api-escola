"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);


var _express = require('express');
var _StudantController = require('../controllers/StudantController'); var _StudantController2 = _interopRequireDefault(_StudantController);
var _AuthMiddleware = require('../middlewares/AuthMiddleware'); var _AuthMiddleware2 = _interopRequireDefault(_AuthMiddleware);
var _upload = require('../config/upload'); var _upload2 = _interopRequireDefault(_upload);

const router = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _upload2.default)

router.get('/', _AuthMiddleware2.default, _StudantController2.default.index);
router.post('/', _AuthMiddleware2.default, _StudantController2.default.store);

// Imagem do estudante
router.post('/upload', _AuthMiddleware2.default, upload.single('photo'), _StudantController2.default.uploadStore);
router.delete('/image', _AuthMiddleware2.default, _StudantController2.default.deleteImage);

router.get('/:id', _AuthMiddleware2.default, _StudantController2.default.show);
router.put('/', _AuthMiddleware2.default, _StudantController2.default.update);
router.delete('/', _AuthMiddleware2.default, _StudantController2.default.destroy);

exports. default = router;
