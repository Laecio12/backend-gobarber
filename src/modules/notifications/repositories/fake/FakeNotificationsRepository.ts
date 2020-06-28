import { MongoRepository, getMongoRepository } from 'typeorm';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import Notification from '../../infra/typeorm/schemas/Notfication';
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO'
import {ObjectID} from 'mongodb'
class NotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];
  
  public async create({
    content,
    recipient_id
  }: ICreateNotificationsDTO): Promise<Notification> {
    const notification = new Notification();
    Object.assign(notification, {id: new ObjectID(), content, recipient_id});
    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;