import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPssawordService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppErrors';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUsersTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('resetPasswordService', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
  
    fakeUserTokenRepository = new FakeUsersTokenRepository();

    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokenRepository,
      fakeHashProvider
    )
  })
  it('should be able to reset the password', async () => {
    
    let user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@silper.com',
      password: '123456',
     });

   const {token } = await fakeUserTokenRepository.generate(user.id);

   const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

   await resetPassword.execute({ 
     password: '123123',
     token,
   });

   const updatedUser = await fakeUsersRepository.findById(user.id);

   await expect(generateHash).toBeCalledWith('123123')
   await expect(updatedUser?.password).toBe('123123')

  });

  it('should not be able to reset the password with non-existing token', async () => {
    

    await expect(resetPassword.execute({
      token: 'non-existing-token',
      password: '123456',
    
     })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokenRepository.generate(
      'non-existing-user'
    );

    await expect(resetPassword.execute({
      token,
      password: '123456',
    
     })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset the password if passed more than 2 hours', async () => {
    
    let user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@silper.com',
      password: '123456',
     });

   const {token } = await fakeUserTokenRepository.generate(user.id);

   jest.spyOn(Date, 'now').mockImplementationOnce(() => {
     const customDate = new Date();

     return customDate.setHours(customDate.getHours() + 3);
   })


   await expect( resetPassword.execute({ 
     password: '123123',
     token,
     }),

    ).rejects.toBeInstanceOf(AppError);
   
  });
  
})