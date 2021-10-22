import { getRepository, Repository } from 'typeorm';
import { IModulesRepository } from '@modules/modules/repositories/IModulesRepository';
import BaseRepository from '@shared/infra/typeorm/repositories/BaseRepository';
import { Module } from '@modules/modules/infra/typeorm/entities/Module';

export class ModulesRepository extends BaseRepository<Module> implements IModulesRepository {
    readonly ormRepository: Repository<Module>;

    constructor() {
        const repo = getRepository(Module);
        super(repo);
        this.ormRepository = repo;
    }

    public async findByName(name: string): Promise<Module | undefined> {
        const item = this.ormRepository.findOne({
            where: { name },
        });

        return item;
    }
}
