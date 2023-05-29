import bcrypt from 'bcryptjs';
import { Login } from 'src/types/login';
import UserModel from '../database/models/user.model';
import tokenUtils from '../auth/authFunctions';
import { ServiceResponse } from '../types/ServiceResponse';

export type LoginResponse = ServiceResponse < Login >;
async function login(username:string, password:string):Promise<LoginResponse> {
  const loginConfirm = await UserModel.findOne({
    where: { username },
    attributes: ['id', 'username', 'password'], 
  });
  if (!loginConfirm || !bcrypt
    .compareSync(password, loginConfirm.dataValues.password.toString())) { 
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }
  const { id } = loginConfirm.dataValues;
  const token = tokenUtils.createToken(id, loginConfirm.dataValues.username);
  return { status: 'SUCCESSFUL', data: { token } };
}

export default { login };