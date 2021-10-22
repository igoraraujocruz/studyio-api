import { inject, injectable } from 'tsyringe';
import { Lesson } from '@modules/lessons/infra/typeorm/entities/Lesson';
import { ILessonsRepository } from '@modules/lessons/repositories/ILessonsRepository';
import { CreateLessonDTO } from '@modules/lessons/dtos/CreateLessonDTO';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateLessonService {
    constructor(
        @inject('LessonsRepository')
        private lessonsRepository: ILessonsRepository,
    ) {}

    public async execute({
        name,
        date,
        moduleId
    }: CreateLessonDTO): Promise<Lesson> {

        const lessonExist = await this.lessonsRepository.findByName(name)

        if(lessonExist) {
            throw new AppError('This lesson already exist')
        }

        const lesson = await this.lessonsRepository.create({
            name,
            date,
            moduleId
        });

        return lesson;
    }
}
