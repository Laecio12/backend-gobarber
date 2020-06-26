import IUserRepository from '../repositories/IUserRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorangeProvider';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  user_id: string;
  avatarFileName: string;
}

injectable();
export default class UploadAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ){}
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only autheticated users can change avatar', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFileName);
    user.avatar = filename;

    await this.userRepository.save(user);

    return user;
  }
}
