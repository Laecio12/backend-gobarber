import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/hashProvider/models/IHashProvider';

import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppErrors';
import { injectable, inject } from 'tsyringe';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}
@injectable()
export default class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ){}
  public async execute({ email, password }: Request): Promise<Response> {
 
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // o hash foi geraro pelo site md5.

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
