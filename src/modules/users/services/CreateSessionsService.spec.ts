import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './CreateSessionService';
import AppError from '@shared/errors/AppErrors'

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
     fakeUsersRepository = new FakeUsersRepository();
     fakeHashProvider = new FakeHashProvider();
      createUser = new CreateUserService(
      fakeUsersRepository, 
      fakeHashProvider
      );

      authenticateUser = new AuthenticateUserService(
        fakeUsersRepository, 
        fakeHashProvider,
      );
  })
  it('should be able to authenticate', async () => {
    
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

    await createUser.execute({
     name: 'Jonh Doe',
     email: 'jonhdoe@silper.com',
     password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'jonhdoe@silper.com',
      password: '123456',
    });

    await expect(response).toHaveProperty('token')

    
  });


  it('should not be able to authenticate with non existing user', async () => {
    

    await expect(
      authenticateUser.execute({
        email: 'jonhdoe@silper.com',
        password: '123456',
    
      }),
    ).rejects.toBeInstanceOf(AppError);


    
  });

  it('should not be able to authenticate with wrong password', async () => {
    
    authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)

    await createUser.execute({
     name: 'Jonh Doe',
     email: 'jonhdoe@silper.com',
     password: '123456',
    });

    await expect(authenticateUser.execute({
      email: 'jonhdoe@silper.com',
      password: 'wrong-password',
    })).rejects.toBeInstanceOf(AppError);
  });
  
})