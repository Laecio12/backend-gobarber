import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'


import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppErrors'

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider;
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  })

  it('should be able to create a new user', async () => {
   

    const user = await createUser.execute({
     name: 'Jonh Doe',
     email: 'jonhdoe@silper.com',
     password: '123456',
    });

    await expect(user).toHaveProperty('id');

  });

  it('should not be able create two user with email equal', async () => {
    
    const user_email = 'jonhdoe@silper.com';

     await createUser.execute({
      name: 'Jonh Doe',
      email: user_email,
      password: '123456',
    });

    await expect(createUser.execute({
      name: 'Jonh Doe',
      email: user_email,
      password: '123456',
    })).rejects.toBeInstanceOf(AppError)
  })
  

  
})