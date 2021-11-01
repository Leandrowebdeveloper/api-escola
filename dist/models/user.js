"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

 class User extends _sequelize.Model {

   /**
   * @class Studant
   * @function init
   * @param {*} sequelize
   * @param {*} DataTypes
   * @returns
   */
  static init(sequelize, DataTypes) {

    return super.init({
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        default: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres.'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        default: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo sobrenome deve ter entre 3 e 255 caracteres.'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Email inválido.'
          }
        }
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      password: {
        type: DataTypes.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'Campo senha deve ter entre 6 e 50 caracteres.'
          }
        }
      },
      level: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: 2
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },
    {
      hooks: {
        beforeCreate: async (user, options) => {
          if (user.password) {
            user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
          }
        }
      },
      sequelize,
      modelName: 'User',
      tableName: 'Users'
    });

  }

  /**
   * @class User
   * @function isPasswordValid
   * @readonly Verifica se a senha do usuário e válida
   * @param string password
   * @param string dbPassword
   * @returns boolean
   */
  static isPasswordValid(password, dbPassword) {
    return _bcryptjs2.default.compare(password, dbPassword);
  }


  /**
   * @class User
   * @function token
   * @readonly Gera um string jwt token
   * @param string values
   * @returns string token jwt
   */
  static token(values) {
    return _jsonwebtoken2.default.sign(values, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION
    })
  }

} exports.default = User;




