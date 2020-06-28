import { container } from 'tsyringe';
import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IApopointmentRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';


container.registerSingleton<IAppointmentsRepository>(
   'AppointmentsRepository', 
  AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository', 
    UsersRepository
);

container.registerSingleton<IUserTokenRepository>(
    'UserTokensRepository',
    UserTokenRepository,
); 

container.registerSingleton<INotificationsRepository>( 
    'NotificationsRepository',
    NotificationsRepository,
)
  
