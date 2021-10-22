import { inject, injectable } from 'tsyringe';
import { Module } from '@modules/modules/infra/typeorm/entities/Module';
import { IModulesRepository } from '@modules/modules/repositories/IModulesRepository';
import { CreateModuleDTO } from '@modules/modules/dtos/CreateModuleDTO';
import AppError from '@shared/errors/AppError';

@injectable()
export class CreateModuleService {
    constructor(
        @inject('ModulesRepository')
        private modulesRepository: IModulesRepository,
    ) {}

    public async execute({
        name,
    }: CreateModuleDTO): Promise<Module> {

        const moduleExist = await this.modulesRepository.findByName(name)

        if(moduleExist) {
            throw new AppError('This module already exist')
        }

        const module = await this.modulesRepository.create({
            name,
        });

        return module;
    }
}
