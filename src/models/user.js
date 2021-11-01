import { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class User extends Model {

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
            user.password_hash = await bcryptjs.hash(user.password, 8);
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
    return bcryptjs.compare(password, dbPassword);
  }


  /**
   * @class User
   * @function token
   * @readonly Gera um string jwt token
   * @param string values
   * @returns string token jwt
   */
  static token(values) {
    return jwt.sign(values, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION
    })
  }

}




