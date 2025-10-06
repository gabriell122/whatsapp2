import bcrypt from 'bcrypt';

//GERA O HASH
export function GerarHash({ password }) {
  return bcrypt.hashSync(password, 10);
}

//VALIDA O HASH
export function VerificarSenha({ password,  hash}) {
  return bcrypt.compareSync( password, hash );
}