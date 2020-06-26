import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface ImailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}