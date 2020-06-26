import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppErrors'

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUsersTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUsersTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository
    )
  })
  it('should be able to recover the passaword using teh email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    
    await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@silper.com',
      password: '123456',
     });

    await sendForgotPasswordEmail.execute({
     
     email: 'jonhdoe@silper.com',
     
    });

    await expect(sendMail).toHaveBeenCalled();

  });

  it('should not be able to recover a non-exesting user password', async () => {
    

    await expect(sendForgotPasswordEmail.execute({
      email: 'jonhdoe@silper.com',
     })).rejects.toBeInstanceOf(AppError);
  })

  it('should generate a forget password token', async () => {
    
   
    const generateToken  = jest.spyOn(fakeUserTokenRepository, 'generate');

    
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'jonhdoe@silper.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
     
     email: 'jonhdoe@silper.com',
     
    });

    await expect(generateToken).toHaveBeenCalledWith(user.id);

  }) 
  
})