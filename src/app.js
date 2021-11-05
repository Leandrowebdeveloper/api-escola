
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';


import homeRoutes from './routes/studant';
import userRoutes from './routes/user';
import loginRoutes from './routes/login';


const allowlist = [`${process.env.APP_DOMAIN}`, `${process.env.APP_URL}:${process.env.APP_PORT}`]



const corsOptions = {
  origin: function (origin, callback) {
    if(allowlist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Erro cors'));
    }
  }
}




/**
 * @class App
 */
class App {
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  routes(){
    this.app.use('/api/studant', homeRoutes);
    this.app.use('/api/user', userRoutes);
    this.app.use('/api/login', loginRoutes);
  }



}


export default new App().app;
