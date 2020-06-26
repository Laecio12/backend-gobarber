import User from '@modules/users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  user_id: string;
  month: number;
  year: number
}
type IResponse = Array<{
  day: number;
  avaible: boolean;
}>;

@injectable()
class ListProviderMonthAvalabilityService {
  constructor() {}

  public async execute({ user_id, month, year }: IRequest): Promise<IResponse> {
    return [{day: 1, avaible: false}];
  }
}

export default ListProviderMonthAvalabilityService;
