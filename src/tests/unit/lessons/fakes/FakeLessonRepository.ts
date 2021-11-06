import { ILessonsRepository } from '@modules/lessons/repositories/ILessonsRepository';
import { Lesson } from '@modules/lessons/infra/typeorm/entities/Lesson';
import { CreateLessonDTO } from '@modules/lessons/dtos/CreateLessonDTO';
import { UpdateLessonDTO } from '@modules/lessons/dtos/UpdateLessonDTO';
import { v4 as uuid } from 'uuid';

export class FakeLessonRepository implements ILessonsRepository {
    private lessons: Lesson[] = [];

    public async create(data: CreateLessonDTO): Promise<Lesson> {
        const lesson = new Lesson();
        Object.assign(lesson, { id: uuid() }, data);
        this.lessons.push(lesson);

        return lesson;
    }

    public async update(data: UpdateLessonDTO): Promise<Lesson> {
        const lesson = new Lesson();
        Object.assign(lesson, { id: uuid() }, data);
        this.lessons.push(lesson);

        return lesson;
    }

    public async delete(item: Lesson): Promise<void> {
        const findIndex = this.lessons.findIndex(
            findLesson => findLesson.id === item.id,
        );

        this.lessons[findIndex].deletedAt = new Date();
    }

    public async findById(id: string): Promise<Lesson | undefined> {
        return this.lessons.find(lesson => lesson.id === id);
    }

    public async findByName(name: string): Promise<Lesson | undefined> {
        return this.lessons.find(lesson => lesson.name === name);
    }

    public async findByModule(moduleId: string): Promise<Lesson[] | undefined> {
        return this.lessons.filter(lesson => lesson.id === moduleId);
    }

    public async findAll(): Promise<Lesson[]> {
        return this.lessons;
    }

    public async save(item: Partial<Lesson>): Promise<Lesson> {
        const lesson = new Lesson();

        Object.assign(lesson, { id: item.id }, item);

        const findIndex = this.lessons.findIndex(
            findLesson => findLesson.id === lesson.id,
        );

        this.lessons[findIndex] = lesson;

        return lesson;
    }
}
