import IAppointmentRepository from '@modules/appointments/repositories/IApopointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import Appointment from '../../infra/typeorm/entities/Appointment';
import { isEqual } from 'date-fns'
import { uuid } from 'uuidv4'

class AppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => 
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }
  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {id: uuid(), date, provider_id});

    this.appointments.push(appointment);

    return appointment;
  } 
}

export default AppointmentsRepository;