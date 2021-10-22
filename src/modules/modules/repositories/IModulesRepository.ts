import { Module } from '@modules/modules/infra/typeorm/entities/Module';
import { IBaseRepository } from '@shared/repositories/IBaseRepository';

export interface IModulesRepository extends IBaseRepository<Module> {
    findByName(name: string): Promise<Module | undefined>
}
