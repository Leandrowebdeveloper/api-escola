"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);


/**
 * @class LoginController
 */
class LoginController {

  /**
   * @class LoginController
   * @function logged
   * @readonly Verifica se o usuário tem acesso ao sisttema
   * @param {*} req
   * @param {*} res
   * @returns
   */
  async logged(req, res) {
   try {

    const { email, password } = req.body;

    // verifica se os campos estão vazios
    if (!email || !password) {

      return res.status(401).json({error: 'Campo email e senha são obrigatórios.' });

    }

    // seleciona o campo email
    const user = await _user2.default.findOne({ where: { email } });

    // verifica se o campo email existe no banco de dados
    if (!user) {

      return res.status(401).json({ error: 'E-mail inválido.' });

    }

    // verifica se a senha e valida
    if (!(await _user2.default.isPasswordValid(password, user.password_hash))) {

      return res.status(401).json({ error: 'Senha inválida.' });

    }

    // Gera o tokem jwt
    const token = _user2.default.token({ id: user.id, email: user.email });

    return res.status(200).json({ token });


   } catch (errors) {
    return res.status(400).json({ errors });
   }

  }

}

exports. default = new LoginController();
