"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

/**
 * @class Studant
 * @extends Model
 */
 class Studant extends _sequelize.Model {

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
        allowNull: {
          msg: 'O campo nome não pode ser vazio.'
        },
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres.'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: {
          msg: 'O campo nome não pode ser vazio.'
        },
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
        unique: {
          msg: 'E-mail ja existe.'
        },
        validate: {
          is: {
            msg: 'O campo e-mail data vazio.'
          },
          isEmail: {
            msg: 'Email não e válido.'
          }
        }
      },
      age: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          is: {
            msg: 'O campo idade data vazio.'
          },
          isDate: {
            msg: 'Campo data não e válido.'
          }
        }
      }
    }, {
      sequelize,
      modelName: 'Studant',
      tableName: 'Studants',
    })

  }

  /**
   * @class Studant
   * @function associate
   * @readonly Relaciona a tabela Studants com a tabela de Images
   * @param {*} models
   */
  static associate(models) {
    this.hasOne(models, { foreignKey: 'studantId', hooks: true });
  }

} exports.default = Studant;

