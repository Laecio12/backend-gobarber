import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import IApointmentsRepository from '../repositories/IApopointmentRepository';
import {getHours, isAfter } from 'date-fns';
interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number,
}
type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvalabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IApointmentsRepository,
  ) {}

  public async execute({ provider_id, day, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year,
    }
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      {length: 10},
      (_, index) => index + hourStart,
    );
    
    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentsInHour = appointments.find(
        appointment => {
        return getHours(appointment.date) === hour;
      });

      const comparedate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentsInHour && isAfter(comparedate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvalabilityService;
