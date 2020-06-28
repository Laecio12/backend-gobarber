import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvalabilityService from './ListProviderDayAvalability';

import AppError from '@shared/errors/AppErrors'

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvalability: ListProviderDayAvalabilityService;

describe('ListProviderDayAvalability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    
    listProviderDayAvalability = new ListProviderDayAvalabilityService (
      fakeAppointmentsRepository
    );
  })

  it('should be able to list Day availability from provider', async () => {
   
    await fakeAppointmentsRepository.create({
     provider_id: 'provider_id',
     user_id: 'user_id',
     date: new Date(2020, 5, 28, 14, 0, 0)
    });
   
    await fakeAppointmentsRepository.create({
     provider_id: 'provider_id',
     user_id: 'user_id',
     date: new Date(2020, 5, 28, 15, 0, 0)
    });
   
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 11).getTime();
    })

    const availability = await listProviderDayAvalability.execute({
      provider_id: 'user_id',
      year: 2020,
      month: 6,
      day: 28,
    });

    expect(availability).toEqual(expect.arrayContaining([
      {hour: 8, availability: false},
      {hour: 9, availability: false},
      {hour: 10, availability: false},
      {hour: 11, availability: true},
      {hour: 13, availability: true},
      {hour: 14, availability: false},
      {hour: 15, availability: false},
      {hour: 16, availability: true},
      
    ]))
  });

});
  