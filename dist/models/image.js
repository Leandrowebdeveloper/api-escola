"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

var _sequelize = require('sequelize');

/**
 * @class Image
 * @extends Model
 */
 class Image extends _sequelize.Model {

   /**
   * @class Studant
   * @function init
   * @param {*} sequelize
   * @param {*} DataTypes
   * @returns
   */
  static init(sequelize, DataTypes){
    return super.init({
      filename: {
        type: DataTypes.STRING,
        allowNull: false
      },
      studantId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      url: {
        type: DataTypes.VIRTUAL,
        get(){
          return `${process.env.APP_URL}:${process.env.APP_PORT}/images/${this.getDataValue('filename')}`;
        }
      },
    }, {
      sequelize,
      modelName: 'Image',
      tableName: 'Images'
    })
  }

  /**
   * @class Image
   * @function associate
   * @readonly Relaciona a tabela Images com a tabela de Studants
   * @param {Model} models
   */
  static associate(models) {
    this.belongsTo(models, { foreignKey: 'studantId', hooks: true });
  }

} exports.default = Image;


