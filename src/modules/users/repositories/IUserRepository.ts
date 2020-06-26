import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFaindAllProvidersDTO from '../dtos/IFaindAllProvidersDTO';


export default interface IUsersRepository {
  findAllProviders(data: IFaindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(date: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;

}