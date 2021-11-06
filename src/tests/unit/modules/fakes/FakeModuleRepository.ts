import { IModulesRepository } from '@modules/modules/repositories/IModulesRepository';
import { Module } from '@modules/modules/infra/typeorm/entities/Module';
import { CreateModuleDTO } from '@modules/modules/dtos/CreateModuleDTO';
import { UpdateModuleDTO } from '@modules/modules/dtos/UpdateModuleDTO';
import { v4 as uuid } from 'uuid';

export class FakeModuleRepository implements IModulesRepository {
    private modules: Module[] = [];

    public async create(data: CreateModuleDTO): Promise<Module> {
        const module = new Module();
        Object.assign(module, { id: uuid() }, data);
        this.modules.push(module);

        return module;
    }

    public async update(data: UpdateModuleDTO): Promise<Module> {
        const module = new Module();
        Object.assign(module, { id: uuid() }, data);
        this.modules.push(module);

        return module;
    }

    public async delete(item: Module): Promise<void> {
        const findIndex = this.modules.findIndex(
            findModule => findModule.id === item.id,
        );

        this.modules[findIndex].deletedAt = new Date();
    }

    public async findById(id: string): Promise<Module | undefined> {
        return this.modules.find(module => module.id === id);
    }

    public async findByName(name: string): Promise<Module | undefined> {
        return this.modules.find(module => module.name === name);
    }

    public async findAll(): Promise<Module[]> {
        return this.modules;
    }

    public async save(item: Partial<Module>): Promise<Module> {
        const module = new Module();

        Object.assign(module, { id: item.id }, item);

        const findIndex = this.modules.findIndex(
            findmodule => findmodule.id === module.id,
        );

        this.modules[findIndex] = module;

        return module;
    }
}
