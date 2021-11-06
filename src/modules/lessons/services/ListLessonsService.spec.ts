import 'reflect-metadata';
import { CreateLessonService } from '@modules/lessons/services/CreateLessonService';
import { ListLessonsServices } from '@modules/lessons/services/ListLessonsService';
import { AppError } from '@shared/errors/AppError';
import { FakeModuleRepository } from '../../../tests/unit/modules/fakes/FakeModuleRepository';
import { FakeLessonRepository } from '../../../tests/unit/lessons/fakes/FakeLessonRepository';

let createLessonService: CreateLessonService;
let fakeLessonRepository: FakeLessonRepository;
let fakeModuleRepository: FakeModuleRepository;
let listLessonsServices: ListLessonsServices;

describe('List Lessons', () => {
    beforeEach(() => {
        fakeLessonRepository = new FakeLessonRepository();
        fakeModuleRepository = new FakeModuleRepository();
        createLessonService = new CreateLessonService(
            fakeLessonRepository,
            fakeModuleRepository,
        );
        listLessonsServices = new ListLessonsServices(fakeLessonRepository);
    });

    it('Should be able to list all lessons', async () => {
        const module = await fakeModuleRepository.create({
            name: 'Python',
            description: 'nice',
        });

        const lesson = await createLessonService.execute({
            name: 'Variable',
            description: 'nice',
            date: new Date(),
            moduleName: module.name,
        });

        const lessons = await listLessonsServices.execute();

        expect(lessons).toEqual(expect.arrayContaining([lesson]));
    });

    it('Should be able to list lesson by id', async () => {
        const module = await fakeModuleRepository.create({
            name: 'Python',
            description: 'nice',
        });

        const lesson = await createLessonService.execute({
            name: 'Variable',
            description: 'nice',
            date: new Date(),
            moduleName: module.name,
        });

        const findLesson = await listLessonsServices.execute(lesson.id);

        expect(findLesson);
    });

    it('Should not be able to list lesson by id, if id not exist', async () => {
        const id = 'adiasdhaidhasiudhiahdu';
        await expect(listLessonsServices.execute(id)).rejects.toBeInstanceOf(
            AppError,
        );
    });
});
