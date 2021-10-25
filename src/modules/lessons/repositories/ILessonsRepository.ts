import { Lesson } from '@modules/lessons/infra/typeorm/entities/Lesson';
import { IBaseRepository } from '@shared/repositories/IBaseRepository';

export interface ILessonsRepository extends IBaseRepository<Lesson> {
    findByName(name: string): Promise<Lesson | undefined>
    findByModule(moduleId: string): Promise<Lesson[] | undefined>
}
