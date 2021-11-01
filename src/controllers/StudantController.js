import databaseConfig from '../config/database';
import {
  Sequelize,
  DataTypes
} from 'sequelize';
import fs from 'fs';
import { resolve } from 'path';

const sequelize = new Sequelize(databaseConfig);

import Studant from "../models/studant";
import Image  from "../models/image";

/**
 * @class StudantController
 */
class StudantController {

  constructor(){

    // Inicialização das classes de modelo
    Studant.init(sequelize, DataTypes);
    Image.init(sequelize, DataTypes);

    // associação de tabelas
    Studant.associate(Image);

  }


  // filds da tabela
  static attributes = [
    'id', 'firstName', 'lastName', 'email', 'age', 'updatedAt', 'createdAt'
  ];




  /**
   * @class StudantController
   * @function index
   * @readonly Lista todo os usuario
   * @param {*} req request
   * @param {*} res response
   * @returns Retorna array [] de estudante
   */
  async index(req, res) {
    try {
      let studants;

      const { level } = req.user;

      // verifica o nivel dos estudantes
     if(level === '1' || level === '2'){

      // seleciona tidos os estudantes da tabela
        studants = await Studant.findAll({
          attributes: StudantController.attributes,
          order: [ ['id', 'DESC'] ],
          include: [{  model: Image,  order: [ ['id', 'DESC'] ], attributes: ['filename', 'url'] } ]
        });

     } else {

      // seleciona apenas um uníco estudante
       studants = req.user;

     }

      return res.status(200).json(studants);

    } catch (error) {

      return res.status(403).json({ errors: 'Erro no sistema', type: error });
    }
  }






   /**
   * @class StudantController
   * @function store
   * @readonly Armazena dados do estudante
   * @param {*} req request
   * @param {*} res response
   * @returns Objeto com dados alterados do estudante
   */
    async store(req, res) {
      try {

        const { level } = req.user;

        // verifica o nivel dos estudantes
       if(level === '1' || level === '2') {

          const body = req.body;

          // Inclui o uduário no sistema
          const { firstName, lastName, email, age, updatedAt, createdAt } = await Studant.create(body);

          // retorna o objeto estudante cadastrado
          return res.status(200).json({ firstName, lastName, email, age, updatedAt, createdAt });

        // estudante sem permição
        } else {
          return res.status(401).json({ errors: 'Estudante não tem permição para a ação de cadastrar.' });
       }

      } catch (error) {
          return res.status(403).json({ errors: error.errors.map((err)=> err.message) });
      }
    }




     /**
     * @class StudantController
     * @function show
     * @readonly Seleciona apenas um uníco estudante
     * @param {*} req request
     * @param {*} res response
     * @returns Retorna apenas um objeto estudante
     */
    async show(req, res) {
      try {

        const { level } = req.user;

        let studant;

        // verifica o nivel dos estudantes
       if(level === '1' || level === '2') {

          const { id } = req.params;

          // verifica se exite um id
          if(!id){
            return res.status(400).json({ errors: 'Não existe um identificador.' });
          }

          // seleciona o estudante corrente
          studant = await Studant.findByPk(id, {
            attributes: StudantController.attributes,
            order: [['id', 'DESC']],
            include: { model: Image, as: 'image' }
          });
        } else {

          // seleciona apenas o estudante de nivel > 2
          studant = req.user;

        }

        // verifica se o usuario existe no sistema
        if(!studant){
          return res.status(400).json({ errors: 'Estudante não encontrado.' });
        }

        return res.json(studant);

      } catch (error) {
        return res.status(403).json({ errors: 'Erro no sistema.', error});
      }
    }




     /**
     * @class StudantController
     * @function update
     * @readonly Edita objeto estudante
     * @param {*} req request
     * @param {*} res response
     * @returns boolean
     */
    async update(req, res){
      try {
        const { id } = req.body;

        // redupera o id do tokem do estudante ja verificado
        const userId = req.user.id;

        // recupera nivel do estudante
        const { level } = req.user;

        // verifica se exite um id
        if(!id){
          return res.status(400).json({ errors: 'Não existe um identificador.'});
        }


        const isStudants = await Studant.findByPk(id);

        // verifica se existe estudante
        if(!isStudants){
          return res.status(400).json({ errors: 'Estudante não encontrado.'});
        }

        let studant;
        // verifica o nivel do usuário
        if(level === '1' || level === '2'){

          studant = await Studant.update(req.body, { where: { id } });

        // verifica se o id formulário e igual ao id da base de dados
        } else if(level === '2' && (parseInt(id) === parseInt(userId))) {

          studant = await Studant.update(req.body, { where: { id: userId } });

        // resposta se o usuário não for um usuário do sistema
        } else {
          return res.status(400).json({ error: 'Opss usuário malicioso.'});
        }

        return res.status(200).json({ response: studant[0] });
      } catch (error) {
        return res.status(403).json({ errors: error.errors.map((err)=> err.message) });
      }
    }





     /**
     * @class StudantController
     * @function destroy
     * @readonly Exclui objeto estudante
     * @param {*} req request
     * @param {*} res response
     * @returns boolean
     */
    async destroy(req, res){
      try {

         // recupera nivel do usuáio
         const { level } = req.user;


         // verifica o nivel do usuário
         if(level === '1' || level === '2') {

            const { id } = req.body;
            // verifica se exite um id
            if(!id){
              return res.status(400).json({ errors: 'Não existe um identificador.'});
            }

            const isStudant = await Studant.findByPk(id, { include: [{ model: Image }] });


            // verifica se existe estudante
            if(!isStudant) {
              return res.status(400).json({ errors: 'Estudante não encontrado.'});
            }


            // exclui o estudante
            const studant = await Studant.destroy({ where: { id } });

            if(studant) {

                const { Images } = isStudant.dataValues;

                // exclui arquivo de imagem
                if ( Images.length > 0 ) {

                  const { filename } = Images[0].dataValues;

                  // exclui a imagem
                  StudantController.deleteFiles(filename);

                }

              return res.status(200).json({ response: studant });

            }



        // estudante sem permição
        } else {
          return res.status(401).json({ errors: 'Estudante não tem permição para a ação de cadastrar.' });
        }

      } catch (errors) {
        return res.status(400).json({ errors });
      }
    }





     /**
     * @class StudantController
     * @function uploadStore
     * @readonly Upload da photo do estudante
     * @param {*} req request file
     * @param {*} res response
     * @returns boolean
     */
      async uploadStore(req, res){
        try {

         // recupera nivel do estudante
           const { level } = req.user;

          // id da chave estrangeira
          const { id } = req.body;

          console.log( req.file );
          // o nome do arquivo
          const { filename } = req.file;



         // verifica o nivel do estudante
           if(level === '1' || level === '2') {


              // verifica se exite um id
              if(!id){

                // deleta o arquivo caso o id não exista
                StudantController.deleteFiles(filename);

                return res.status(400).json({ errors: 'Não existe um identificador.'});
              }

              const isStudant = await Studant.findByPk(id);

              // verifica se existe estudante
              if(!isStudant){

                // deleta o arquivo caso o id não exista
                StudantController.deleteFiles(filename);

                return res.status(400).json({ errors: 'Estudante não encontrado.'});
              }


             // salvar imagem na base de dados
             const image = await Image.create( { filename, studantId: id } );

             return res.status(200).json(image);



          // estudante sem permição
          } else {

            // deleta o arquivo caso o id não exista
            StudantController.deleteFiles(filename);

            return res.status(401).json({ errors: 'Estudante não tem permição para a ação de cadastrar.' });
          }

        } catch (error) {
          return res.status(400).json({ error });
        }
      }



     /**
     * @class StudantController
     * @function deleteFiles
     * @readonly Exclui arquivo de imagem na pasta images
     * @param {string} file nome da imagem
     * @returns void
     */
     static deleteFiles(file){

        // caminho absoluto da pasta que armazena os arquivos de imagem
        const path = resolve(__dirname, '..', 'public', 'images');

        // caminho absoluto do arquivo
        const filePath = `${path}/${file}`;

        fs.unlink(filePath, function (err) {
          if (err) throw err;
        });

      }




      /**
     * @class StudantController
     * @function deleteImage
     * @readonly Exclui photo do estudante
     * @param {*} req
     * @param {*} res
     * @returns Boolean
     */
      async deleteImage(req, res) {
        try {

           // recupera nivel do usuário
           const { level } = req.user;


           // verifica o nivel do usuario
           if(level === '1' || level === '2') {

              const { id } = req.body;
              // verifica se exite um id
              if(!id){
                return res.status(400).json({ errors: 'Não existe um identificador.'});
              }

              const isImage = await Image.findByPk(id);
              // verifica se existe estudante
              if(!isImage){
                return res.status(400).json({ errors: 'Estudante não encontrado.'});
              }


              // exclui o db imagem
              const image = await Image.destroy({ where: { id } });

              if(image){

                // exclui arquivo imagem
               StudantController.deleteFiles(isImage.filename);

               return res.status(200).json({ response: image });

              }


          // estudante sem permição
          } else {
            return res.status(401).json({ errors: 'Usuário não tem permição para a ação de cadastrar.' });
          }

        } catch (error) {
          return res.status(400).json({ error });
        }
      }

}

export default new StudantController();
