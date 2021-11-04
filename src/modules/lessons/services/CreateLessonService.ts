import { inject, injectable } from 'tsyringe';
import { Lesson } from '@modules/lessons/infra/typeorm/entities/Lesson';
import { ILessonsRepository } from '@modules/lessons/repositories/ILessonsRepository';
import { CreateLessonDTO } from '@modules/lessons/dtos/CreateLessonDTO';
import { AppError } from '@shared/errors/AppError';
import { IModulesRepository } from '@modules/modules/repositories/IModulesRepository';

@injectable()
export class CreateLessonService {
    constructor(
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,

        @inject('ModulesRepository')
        private modulesRepository: IModulesRepository,
    ) {}

    public async execute({
        name,
        date,
        moduleName,
        description,
    }: CreateLessonDTO): Promise<Lesson> {
        const module = await this.modulesRepository.findByName(moduleName);

        if (!module) {
            throw new AppError('module not found');
        }

        const lesson = await this.lessonsRepository.create({
            name,
            date,
            moduleId: module.id,
            description,
        });

        return lesson;
    }
}
