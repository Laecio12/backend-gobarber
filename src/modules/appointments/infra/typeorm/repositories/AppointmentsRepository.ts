import { getRepository, Repository } from 'typeorm';
import IAppointmentRepository from '@modules/appointments/repositories/IApopointmentRepository';
import Appointment from '../entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    return findAppointment;
  }
  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const Appointment = this.ormRepository.create({provider_id, date});
    await this.ormRepository.save(Appointment);

    return Appointment;
  }
}

export default AppointmentsRepository;