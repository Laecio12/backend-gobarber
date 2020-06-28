import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fake/FakeNotificationsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppErrors'

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository()
    
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  })
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 28, 12).getTime();
    })

    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: 'user_id',
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');

  });

  it('should not be able to create two appointments on the same time ', async () => {
    
    const appointmentDate = new Date();

     await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user_id',
      provider_id: '123123',
    });

    expect(createAppointment.execute({
      date: appointmentDate,
      user_id: 'user_id',
      provider_id: '123123',
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 28, 12).getTime();
    })

    await expect(createAppointment.execute({
      date: new Date(2020, 5, 28, 11),
      user_id: 'user_id',
      provider_id: '123123',
    }),
    
    ).rejects.toBeInstanceOf(AppError);

  });
  it('should not be able to create appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 28, 12).getTime();
    })

    await expect(createAppointment.execute({
      date: new Date(2020, 5, 28, 13),
      user_id: 'user_id',
      provider_id: '123123',
    }),
    
    ).rejects.toBeInstanceOf(AppError);

  });
  it('should not be able to create appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 28, 12).getTime();
    })

    await expect(createAppointment.execute({
      date: new Date(2020, 5, 29, 7),
      user_id: 'user_id',
      provider_id: '123123',
     }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(createAppointment.execute({
      date: new Date(2020, 5, 29, 18),
      user_id: 'user_id',
      provider_id: '123123',
     }),
    ).rejects.toBeInstanceOf(AppError);

  });
});