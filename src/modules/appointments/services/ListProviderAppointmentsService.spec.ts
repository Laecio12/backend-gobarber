
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

import AppError from '@shared/errors/AppErrors'

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersAppointments: ListProviderAppointmentsService

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProvidersAppointments = new ListProviderAppointmentsService(
     fakeAppointmentsRepository
    );
  })

  it('should be able to list the appointments om a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
     provider_id: 'provider_id',
     user_id: 'user_id',
     date: new Date(2020, 5, 28, 14, 0, 0)
    });
    
    const appointment2 = await fakeAppointmentsRepository.create({
     provider_id: 'provider_id',
     user_id: 'user_id',
     date: new Date(2020, 5, 28, 15, 0, 0)
    });
    
    const appointments = await listProvidersAppointments.execute({
      provider_id: 'provider',
      day: 28,
      month: 6,
      year: 2020,
    })
   
    expect(appointments).toEqual([appointment1, appointment2]);
   

  });

});
  