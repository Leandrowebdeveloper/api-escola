import multer from "multer";
import { resolve, extname } from 'path';

// caminho absoluto da pasta
const pathFiles = resolve(__dirname, '..', 'public', 'images');

export default {

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
  storage: multer.diskStorage({

    // destino do arquivo
    destination: (req, file, cb) => {
      cb(null, pathFiles);
    },

    filename: (req, file, cb) => {

      // nome do arquivo
      const fileName = `${Date.now()}${extname(file.originalname)}`;

      cb(null, fileName);
    }
  })
}
