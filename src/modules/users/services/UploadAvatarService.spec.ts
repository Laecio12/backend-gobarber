import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UploadAvatarService';

import AppError from '@shared/errors/AppErrors'

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('CreateUser', () => {
  beforeEach(() => {
     fakeUsersRepository = new FakeUsersRepository();
     fakeStorageProvider = new FakeStorageProvider();
     updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  })
  it('should be able to update avatar user', async () => {
    

    const user = await fakeUsersRepository.create({
     name: 'Jonh Doe',
     email: 'jonhdoe@silper.com',
     password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    })

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar of a user non existent', async () => {
    
    await expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFileName: 'avatar.jpg',
    })).rejects.toBeInstanceOf(AppError);
  });


  it('should delete old avatar when updating new one', async () => {
   
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    
    const user = await fakeUsersRepository.create({
     name: 'Jonh Doe',
     email: 'jonhdoe@silper.com',
     password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });
    await expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    await expect(user.avatar).toBe('avatar2.jpg');
  });

 
})