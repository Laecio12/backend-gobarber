import IMailtemplateProvider from '../models/ImailTemplateProvider'

export default class fakeMailProvider implements IMailtemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}