import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { Module } from '@modules/modules/infra/typeorm/entities/Module';
import { IModulesRepository } from '@modules/modules/repositories/IModulesRepository';
import { UpdateModuleDTO } from '@modules/modules/dtos/UpdateModuleDTO';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class UpdateModuleService extends BaseService<Module> {
    constructor(
        @inject('ModulesRepository')
        private modulesRepository: IModulesRepository,
    ) {
        super(modulesRepository);
    }

    public async execute({
        id,
        name,
        description,
    }: UpdateModuleDTO): Promise<Module> {
        const module = await this.modulesRepository.findById(id);

        if (!module) {
            throw new AppError('Module not found');
        }

        const moduleExist = await this.modulesRepository.findByName(name);

        if (moduleExist) {
            throw new AppError('This module name is already in use');
        }

        module.name = name;
        module.description = description;

        return this.modulesRepository.save(module);
    }
}
