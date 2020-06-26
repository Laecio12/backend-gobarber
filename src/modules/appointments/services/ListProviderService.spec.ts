
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProviderService from './ListProviderService';

import AppError from '@shared/errors/AppErrors'

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProviderService(
      fakeUsersRepository,
    );
  })

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
     name: 'Jonh Doe',
     email: 'jonhdoe@exemple.com',
     password: '123456',
    });
    const user2 = await fakeUsersRepository.create({
     name: 'Jonh Trê',
     email: 'jonhtre@exemple.com',
     password: '123456',
    });
    const loggedUser = await fakeUsersRepository.create({
     name: 'Jonh Qua',
     email: 'jonhqua@exemple.com',
     password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id
    })

   
    expect(providers).toEqual([user1, user2]);
   

  });

});
  