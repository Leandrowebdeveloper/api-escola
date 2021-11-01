"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

// caminho absoluto da pasta
const pathFiles = _path.resolve.call(void 0, __dirname, '..', 'public', 'images');

exports. default = {

  // filtro de tipos de arquivos
  fileFilter: (req, file, cb) => {

    // condição para o tipo de imagem
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {

      // menssagem de erro
      return cb(JSON.stringify({ errors: 'São permitidos arquivos de imagem com extenção .jpeg e .png' }), false);

    }
    return cb(null, true);
  },

  // armazenamento
  storage: _multer2.default.diskStorage({

    // destino do arquivo
    destination: (req, file, cb) => {
      cb(null, pathFiles);
    },

    filename: (req, file, cb) => {

      // nome do arquivo
      const fileName = `${Date.now()}${_path.extname.call(void 0, file.originalname)}`;

      cb(null, fileName);
    }
  })
}
