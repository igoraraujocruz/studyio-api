import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { Lesson } from '@modules/lessons/infra/typeorm/entities/Lesson';
import { ILessonsRepository } from '@modules/lessons/repositories/ILessonsRepository';
import { UpdateLessonDTO } from '@modules/lessons/dtos/UpdateLessonDTO';
import { AppError } from '@shared/errors/AppError';
import { IModulesRepository } from '@modules/modules/repositories/IModulesRepository';

@injectable()
export class UpdateLessonService extends BaseService<Lesson> {
    constructor(
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,

        @inject('ModulesRepository')
        private modulesRepository: IModulesRepository,
    ) {
        super(lessonsRepository);
    }

    public async update({
        id,
        name,
        date,
        description,
        moduleName,
    }: UpdateLessonDTO): Promise<Lesson> {
        const lesson = await this.lessonsRepository.findById(id);

        if (!lesson) {
            throw new AppError('Lesson not found');
        }

        const module = await this.modulesRepository.findByName(moduleName);

        if (!module) {
            throw new AppError('Module not found');
        }

        lesson.name = name;
        lesson.date = date;
        lesson.description = description;
        lesson.moduleId = module.id;

        return this.lessonsRepository.save(lesson);
    }
}
