import { container } from 'tsyringe';

import IStorangeProvider from './StorageProvider/models/IStorangeProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EthrealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HadlebarsMailTemplateProviders';

container.registerSingleton<IStorangeProvider>(
  'StorageProvider',
  DiskStorageProvider,
);


container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);
  
container.registerInstance<IMailProvider>(       
    'MailProvider',
    container.resolve(EtherealMailProvider),
);