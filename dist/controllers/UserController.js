"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _sequelize = require('sequelize');

const sequelize = new (0, _sequelize.Sequelize)(_database2.default);

var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);


/**
 * @class UserController
 */
class UserController {

  constructor(){

    // Inicialização das classes de modelo
    _user2.default.init(sequelize, _sequelize.DataTypes);
  }


  // filds da tabela
  static __initStatic() {this.attributes = { attributes: [
    'id', 'firstName', 'lastName', 'level', 'email', 'status', 'updatedAt', 'createdAt'
  ]}}





  /**
   * @class UserController
   * @function index
   * @readonly Lista todo os usuario
   * @param {*} req request
   * @param {*} res response
   * @returns Retorna array [] de usuário
   */
  async index(req, res) {
    try {
      let users;

      // verifica o nivel dos usuários
      if(req.user.level === '1'){

        // seleciona tidos os usuarios da tabela
        users = await _user2.default.findAll(UserController.attributes);

      } else {

        // seleciona apenas um unico usuário
        users = req.user;

      }

      return res.status(200).json(users);

    } catch (error) {

      return res.status(403).json({ errors: 'Erro no sistema.'});

    }
  }




   /**
   * @class UserController
   * @function store
   * @readonly Armazena dados do usuário
   * @param {*} req request
   * @param {*} res response
   * @returns Objeto com dados alterados do usuário
   */
  async store(req, res) {
    try {

      // verifica o nivel dos usuários
      if(req.user.level === '1') {
        const body = req.body;

        // Inclui o uduário no sistema
        const { id, firstName, lastName, email, level, status, updatedAt, createdAt } = await _user2.default.create(body);

        // retorna o objeto usuário cadastrado
        return res.status(200).json({ id, firstName, lastName, email, level, status, updatedAt, createdAt });

      // usuário sem permição
      } else {
        return res.status(401).json({ errors: 'Usuário não tem permição para a ação de cadastrar.' });
      }

    } catch (error) {
      return res.status(403).json({ errors: error.errors.map((err)=> err.message) });
    }
  }




   /**
   * @class UserController
   * @function show
   * @readonly Lista objeto usuário
   * @param {*} req request
   * @param {*} res response
   * @returns Retorna apenas um objeto usuário
   */
  async show(req, res) {
    try {

      let users;

      // verifica o nivel do usuário
      if(req.user.level === '1') {

        const { id } = req.params;

        // verifica se exite um id
        if(!id){
          return res.status(400).json({ errors: 'Não existe um identificador.' });
        }

        // seleciona o usuário corrente
        users = await _user2.default.findByPk(id, UserController.attributes);

      } else {

        // seleciona apenas o usuário de nivel > 1
        users = req.user;

      }

      // verifica se o usuario existe no sistema
      if(!users){
        return res.status(400).json({ errors: 'Usuário não encontrado.' });
      }

      return res.json(users);

    } catch (error) {
      return res.status(403).json({ errors: 'Erro no sistema.'});
    }
  }




   /**
   * @class UserController
   * @function update
   * @readonly Edita objeto usuário
   * @param {*} req request
   * @param {*} res response
   * @returns Retorna true || false
   */
  async update(req, res){
    try {
      const { id } = req.body;

      // redupera o id do tokem do usuário ja verificado
      const userId = req.user.id;

      // recupera nivel do usuário
      const { level } = req.user;

      // verifica se exite um id
      if(!id){
        return res.status(400).json({ errors: 'Não existe um identificador.'});
      }


      const isUsers = await _user2.default.findByPk(id);

      // verifica se existe usuário
      if(!isUsers){
        return res.status(400).json({ errors: 'Usuário não encontrado.'});
      }

      let users;
      // verifica o nivel do usuário
      if(level === '1'){

        users = await _user2.default.update(req.body, { where: { id } });

      // verifica se o id formulário e igual ao id da base de dados
      } else if(level === '2' && (parseInt(id) === parseInt(userId))) {

        users = await _user2.default.update(req.body, { where: { id: userId } });

      // resposta se o usuário não for um usuário do sistema
      } else {
        return res.status(400).json({ errors: 'Opss usuário malicioso.'});
      }

      return res.status(200).json({ response: users[0] });
    } catch (error) {
      return res.status(403).json({ error: error.errors.map((err)=> err.message) });
    }
  }





   /**
   * @class UserController
   * @function destroy
   * @readonly Exclui objeto usuário
   * @param {*} req request
   * @param {*} res response
   * @returns Retorna true || false
   */
  async destroy(req, res){
    try {

       // verifica o nivel do usuário
       if(req.user.level === '1') {

          const { id } = req.body;
          // verifica se exite um id
          if(!id){
            return res.status(400).json({ errors: 'Não existe um identificador.'});
          }

          const isUsers = await _user2.default.findByPk(id);
          // verifica se existe usuário
          if(!isUsers){
            return res.status(400).json({ errors: 'Usuário não encontrado.'});
          }


          // exclui o usuário
          const users = await _user2.default.destroy({ where: { id: id } });
          return res.status(200).json({ response: users });


      // usuário sem permição
      } else {
        return res.status(401).json({ errors: 'Usuário não tem permição para a ação de cadastrar.' });
      }

    } catch (error) {
      return res.status(400).json({ error });
    }
  }



} UserController.__initStatic();

exports. default = new UserController();
