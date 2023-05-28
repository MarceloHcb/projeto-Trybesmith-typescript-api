import { Request, Response } from 'express';
import loginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

async function login(req:Request, res: Response) {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res.status(400)
      .json({ message: '"username" and "password" are required' });
  }
  try {
    const { status, data } = await loginService.login(username, password);
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }      
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);    
    return res.status(500).json('Erro interno');
  }
}

export default { login };