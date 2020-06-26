import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import UpdateProfileService from './UpdateProfileSevice';

import AppError from '@shared/errors/AppErrors'
import { uuid } from 'uuidv4';
import { create } from 'handlebars';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider;

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  })

  it('should be able to update user prfile', async () => {
   

    const user = await fakeUsersRepository.create({
     name: 'Jonh Doe',
     email: 'jonhdoe@exemple.com',
     password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Trê',
      email: 'jonhtre@exaple.com'
    });

    expect(updatedUser.name).toBe('Jonh Trê');
    expect(updatedUser.email).toBe('jonhtre@exaple.com')

  });

  it('should not be able update to e-mail in use', async () => {
    await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@exemple.com',
      password: '123456'
    })
   

     const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'test@exaple.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Doe',
      email: 'jonhdoe@exaple.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError)
  });


  it('should be able to uptade the password', async () => {
    const user = await fakeUsersRepository.create({
     name: 'Jonh Doe',
     email: 'jonhdoe@exemple.com',
     password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Trê',
      email: 'jonhtre@exaple.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
   

  });

  it('should be able to uptade the password without old password', async () => {
    const user = await fakeUsersRepository.create({
     name: 'Jonh Doe',
     email: 'jonhdoe@exemple.com',
     password: '123456',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Trê',
      email: 'jonhtre@exaple.com',
      password: '123123',
    }));   

  });

  it('should be able to uptade the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
     name: 'Jonh Doe',
     email: 'jonhdoe@exemple.com',
     password: '123456',
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Jonh Trê',
      email: 'jonhtre@exaple.com',
      old_password: 'wrong-old-password',
      password: '123123',
    }));   

  });
  
  
  
})