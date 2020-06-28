import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppErrors';
import IAppointmentRepository from '../repositories/IApopointmentRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
interface IResquest {
  provider_id: string;
  user_id: string;
  date: Date;
}
@injectable()
export default class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    ) {}

  public async execute({ provider_id, user_id, date }: IResquest): Promise<Appointment> {
    
    const appointmentDate = startOfHour(date);

    if(isBefore(appointmentDate, Date.now())){
      throw new AppError(" You can't create an appointment on past date.")
    }

    if(user_id === provider_id){
      throw new AppError("You cant't create an appointment with yourself.")
    }

    if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError("You can't only create appointment between 8am and 5pm")
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('Horário já reservado.');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });
    
    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'")
    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento Para ${dateFormatted}`,
    })
    return appointment;
  }
}
