import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

import AppError from '@shared/errors/AppErrors'

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(
      fakeUsersRepository,
    );
  })

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
     name: 'Jonh Doe',
     email: 'jonhdoe@exemple.com',
     password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    })
    expect(profile.name).toBe('Jonh Doe');
    expect(profile.email).toBe('jonhdoe@exemple.com')

  });

});
  