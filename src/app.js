
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';


import homeRoutes from './routes/studant';
import userRoutes from './routes/user';
import loginRoutes from './routes/login';


class App {
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
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
