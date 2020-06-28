import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvalabilityService from './ListProviderMonthAvalabilityService';

import AppError from '@shared/errors/AppErrors'

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvalability: ListProviderMonthAvalabilityService;

describe('ListProviderMonthAvalability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvalability = new ListProviderMonthAvalabilityService (
      fakeAppointmentsRepository
    );
  })

  it('should be able to list month availability from provider', async () => {
   
    await fakeAppointmentsRepository.create({
     provider_id: 'provider_id',
     user_id: 'user_id',
     date: new Date(2020, 5, 26, 8, 0, 0)
    });
    await fakeAppointmentsRepository.create({
     provider_id: 'provider_id',
     user_id: 'user_id',
     date: new Date(2020, 5, 26, 9, 0, 0)
    });
    await fakeAppointmentsRepository.create({
     provider_id: 'provider_id',
     user_id: 'user_id',
     date: new Date(2020, 5, 26, 10, 0, 0)
    });
    await fakeAppointmentsRepository.create({
     provider_id: 'provider_id',
     user_id: 'user_id',
     date: new Date(2020, 5, 26, 11, 0, 0)
    });
    await fakeAppointmentsRepository.create({
     provider_id: 'provider_id',
     user_id: 'user_id',
     date: new Date(2020, 5, 26, 12, 0, 0)
    });
    await fakeAppointmentsRepository.create({
     provider_id: 'provider_id',
     user_id: 'user_id',
     date: new Date(2020, 5, 26, 13, 0, 0)
    });
    await fakeAppointmentsRepository.create({
     provider_id: 'provider_id',
     user_id: 'user_id',
     date: new Date(2020, 5, 26, 14, 0, 0)
    });
    await fakeAppointmentsRepository.create({
     provider_id: 'provider_id',
     user_id: 'user_id',
     date: new Date(2020, 5, 26, 15, 0, 0)
    });
    await fakeAppointmentsRepository.create({
     provider_id: 'provider_id',
     user_id: 'user_id',
     date: new Date(2020, 5, 26, 16, 0, 0)
    });
    await fakeAppointmentsRepository.create({
     provider_id: 'provider_id',
     user_id: 'user_id',
     date: new Date(2020, 5, 26, 17, 0, 0)
    });
    

    const availability = await listProviderMonthAvalability.execute({
      provider_id: 'user_id',
      year: 2020,
      month: 6,
    });

    expect(availability).toEqual(expect.arrayContaining([
      {day: 25, availability: true},
      {day: 26, availability: false},
      {day: 27, availability: true},
      {day: 28, availability: true},
    ]))
  });

});
  