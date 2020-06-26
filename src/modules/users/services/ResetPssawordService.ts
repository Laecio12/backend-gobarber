import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { addHours, isAfter } from 'date-fns'
import AppError from '@shared/errors/AppErrors';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

  ){}

  public async execute({token, password}: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if( !userToken){
      throw new AppError('user token does not exist')
    }
    const user = await this.userRepository.findById(userToken.user_id);

    if(!user) {
      throw new AppError('user does not exist')
    }
    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2);
    if( isAfter(Date.now(), compareDate)) {
      throw new AppError('token expired')
    }
    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user)
  }
    
}
