import { getRepository, Repository } from 'typeorm';
import { ILessonsRepository } from '@modules/lessons/repositories/ILessonsRepository';
import BaseRepository from '@shared/infra/typeorm/repositories/BaseRepository';
import { Lesson } from '@modules/lessons/infra/typeorm/entities/Lesson';

export class LessonsRepository
    extends BaseRepository<Lesson>
    implements ILessonsRepository
{
    readonly ormRepository: Repository<Lesson>;

    constructor() {
        const repo = getRepository(Lesson);
        super(repo);
        this.ormRepository = repo;
    }

    public async findByName(name: string): Promise<Lesson | undefined> {
        const item = this.ormRepository.findOne({
            where: { name },
        });

        return item;
    }

    public async findByModule(moduleId: string): Promise<Lesson[] | undefined> {
        const item = this.ormRepository.find({
            where: { moduleId },
        });

        return item;
    }
}
