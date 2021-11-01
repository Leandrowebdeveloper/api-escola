"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);


var _studant = require('./routes/studant'); var _studant2 = _interopRequireDefault(_studant);
var _user = require('./routes/user'); var _user2 = _interopRequireDefault(_user);
var _login = require('./routes/login'); var _login2 = _interopRequireDefault(_login);


class App {
  constructor(){
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  }

  routes(){
    this.app.use('/api/studant', _studant2.default);
    this.app.use('/api/user', _user2.default);
    this.app.use('/api/login', _login2.default);
  }



}


exports. default = new App().app;
