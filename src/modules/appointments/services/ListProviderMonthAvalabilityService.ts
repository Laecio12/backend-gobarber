import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import IApointmentsRepository from '../repositories/IApopointmentRepository';
import { getDaysInMonth, getDate } from 'date-fns';
interface IRequest {
  provider_id: string;
  month: number;
  year: number
}
type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvalabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IApointmentsRepository,
  ) {}

  public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id,
      month,
      year,
    }
    );

    const numberOfDayIMonth = getDaysInMonth( new Date(year, month - 1));

    const eachDayArray = Array.from(
      {length: numberOfDayIMonth},
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });
      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvalabilityService;
