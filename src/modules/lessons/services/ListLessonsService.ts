import { inject, injectable } from 'tsyringe';
import { Lesson } from '@modules/lessons/infra/typeorm/entities/Lesson';
import { ILessonsRepository } from '@modules/lessons/repositories/ILessonsRepository';

@injectable()
export class ListLessonsServices {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {}

  public async execute(): Promise<Lesson[]> {
    const lessons = await this.lessonsRepository.findAll();

    return lessons;
  }
}
