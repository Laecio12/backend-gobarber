import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';
import AppError from '@shared/errors/AppErrors';
import IAppointmentRepository from '../repositories/IApopointmentRepository'

interface IResquest {
  provider_id: string;
  date: Date;
}
@injectable()
export default class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
    ) {}

  public async execute({ provider_id, date }: IResquest): Promise<Appointment> {
    
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('Horário já reservado.');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    
    return appointment;
  }
}
