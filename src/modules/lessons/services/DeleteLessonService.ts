import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { Lesson } from '@modules/lessons/infra/typeorm/entities/Lesson';
import { ILessonsRepository } from '@modules/lessons/repositories/ILessonsRepository';

@injectable()
export class DeleteLessonService extends BaseService<Lesson> {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {
    super(lessonsRepository);
  }
}
