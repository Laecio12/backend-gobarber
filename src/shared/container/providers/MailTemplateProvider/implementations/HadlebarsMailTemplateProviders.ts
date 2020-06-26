import  hadlebars from 'handlebars';
import fs from 'fs';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailtemplateProvider from '../models/ImailTemplateProvider'

export default class HandlebarsMailTemplateProvider implements IMailtemplateProvider {
  public async parse({ 
    file, 
    variables 
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = hadlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}