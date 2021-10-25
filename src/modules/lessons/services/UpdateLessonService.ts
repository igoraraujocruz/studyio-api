import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { Lesson } from '@modules/lessons/infra/typeorm/entities/Lesson';
import { ILessonsRepository } from '@modules/lessons/repositories/ILessonsRepository';
import { UpdateLessonDTO } from '@modules/lessons/dtos/UpdateLessonDTO';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class UpdateLessonService extends BaseService<Lesson> {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {
    super(lessonsRepository);
  }

  public async update({
    id,
    name,
    date,
    description
  }: UpdateLessonDTO): Promise<Lesson> {

    const lesson = await this.lessonsRepository.findById(id);

    if (!lesson) {
      throw new AppError('Module not found');
    }

    const lessonExist = await this.lessonsRepository.findByName(name);

    if(lessonExist) {
        throw new AppError('This module name is already in use');
    }

    lesson.name = name;
    lesson.date = date;
    lesson.description = description;

    return this.lessonsRepository.save(lesson);
  }
}
