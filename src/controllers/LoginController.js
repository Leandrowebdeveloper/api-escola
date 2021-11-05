import User from "../models/user";


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
    const user = await User.findOne({ where: { email } });

    // verifica se o campo email existe no banco de dados
    if (!user) {

      return res.status(401).json({ error: 'E-mail inválido.' });

    }

    // verifica se a senha e valida
    if (!(await User.isPasswordValid(password, user.password_hash))) {

      return res.status(401).json({ error: 'Senha inválida.' });

    }

    // Gera o tokem jwt
    const token = User.token({ id: user.id, email: user.email });

    return res.status(200).json({ token, user: req.user });


   } catch (errors) {
    return res.status(400).json({ errors });
   }

  }

}

export default new LoginController();
