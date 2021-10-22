import { inject, injectable } from 'tsyringe';
import BaseService from '@shared/services/BaseService';
import { Module } from '@modules/modules/infra/typeorm/entities/Module';
import {IModulesRepository} from '@modules/modules/repositories/IModulesRepository';

@injectable()
export class DeleteModuleService extends BaseService<Module> {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,
  ) {
    super(modulesRepository);
  }
}
