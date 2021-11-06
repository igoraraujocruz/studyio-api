import { AppError } from '@shared/errors/AppError';

import { ObjectLiteral } from 'typeorm';
import { IBaseRepository } from '@shared/repositories/IBaseRepository';

import { IBaseService } from './interfaces/IBaseServices';

interface IEntity {
    id: string;
}
interface IStandardProps extends IEntity, ObjectLiteral {}

export abstract class BaseService<Entity extends IStandardProps>
    implements IBaseService<Entity>
{
    constructor(private ormRepository: IBaseRepository<Entity>) {}

    readonly serviceName = this.constructor.name.toLowerCase();

    async create(item: Partial<Entity>): Promise<Entity> {
        const items = await this.ormRepository.create(item);

        return items;
    }

    async findAll(): Promise<Entity[]> {
        const entity = await this.ormRepository.findAll();

        return entity;
    }

    async update(itemRequest: Partial<Entity>): Promise<Entity> {
        const item = await this.ormRepository.update(itemRequest);

        if (!item) {
            throw new AppError('Item not found.');
        }

        return item;
    }

    async delete(itemId: string): Promise<void> {
        const item = await this.ormRepository.findById(itemId);

        if (!item) {
            throw new AppError('Item not found.');
        }

        await this.ormRepository.delete(item);
    }

    public async findById(itemId: string): Promise<Entity> {
        const itemToList = await this.ormRepository.findById(itemId);

        if (!itemToList) {
            throw new AppError('Item not found.');
        }

        return itemToList;
    }
}
