import { inject, injectable } from 'tsyringe';
import { Module } from '@modules/modules/infra/typeorm/entities/Module';
import { IModulesRepository } from '@modules/modules/repositories/IModulesRepository';

@injectable()
export class ListModulesServices {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,
  ) {}

  public async execute(): Promise<Module[]> {
    const module = await this.modulesRepository.findAll();

    return module;
  }
}
