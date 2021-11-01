import dotenv from 'dotenv';
dotenv.config();

import { Model } from 'sequelize';

/**
 * @class Image
 * @extends Model
 */
export default class Image extends Model {

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

}


