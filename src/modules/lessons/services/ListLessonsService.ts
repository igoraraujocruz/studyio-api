import { inject, injectable } from 'tsyringe';
import { Lesson } from '@modules/lessons/infra/typeorm/entities/Lesson';
import { ILessonsRepository } from '@modules/lessons/repositories/ILessonsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class ListLessonsServices {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {}

  public async execute(id?: string): Promise<Lesson | Lesson[]> {

    if(id) {
       const lessons = await this.lessonsRepository.findById(id)

       if (!lessons) {
           throw new AppError('Lesson not found')
       }

       return lessons;
    }
    const Alllessons = await this.lessonsRepository.findAll();

    return Alllessons;
  }
}
