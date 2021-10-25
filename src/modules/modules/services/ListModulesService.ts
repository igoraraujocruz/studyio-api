import { inject, injectable } from 'tsyringe';
import { Module } from '@modules/modules/infra/typeorm/entities/Module';
import { IModulesRepository } from '@modules/modules/repositories/IModulesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class ListModulesServices {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,
  ) {}

  public async execute(id?: string): Promise<Module[]> {
    
    if(id) {
       const modules = await this.modulesRepository.findById(id)

       if (!modules) {
           throw new AppError('Module not found')
       }

       return modules;
    }

    const Allmodules = await this.modulesRepository.findAll();

    return Allmodules;
  }
}
