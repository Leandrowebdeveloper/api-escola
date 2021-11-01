import jwt from 'jsonwebtoken';
import User from '../models/user';

/**
 * @function Authentication
 * @readonly Função de autenticação do usuario
 * @readonly Efetua a verificação do token jwt
 * @readonly Efetua a verificação no banco de dados do usuário
 */
export default async (req, res, next ) => {

  // token
  const { authorization } = req.headers;

  // se não existir token
  if(!authorization) {

    return res.status(401).json({ errors: 'Acesso não autorizado.' });

  }

  // recupera o string token
  const [, token] = authorization.split(' ');

  try {

    // verifica se o token e válido
    const data = jwt.verify(token, process.env.TOKEN_SECRET);

    const { id, email } = data;

    // verifica se os dados do armazenados no token tem um usuário
    const isUser = await User.findOne({ where: { id, email } });

    // caso não exista um usuário
    if(!isUser){

      return res.status(401).json({ errors: 'Acesso não autorizado.' });

    }

    // Exclua a senha do objeto usuário no retorno
    delete isUser.dataValues.password_hash;

    // passa o valor do usuário via request
    req.user = { ...isUser.dataValues };

    return next();

  } catch (error) {

    return res.status(401).json({ errors: 'Acesso não autorizado.' });

  }

};
