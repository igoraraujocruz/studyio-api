import 'reflect-metadata';
import { UpdateLessonService } from '@modules/lessons/services/UpdateLessonService';
import { AppError } from '@shared/errors/AppError';
import { CreateLessonService } from '@modules/lessons/services/CreateLessonService';
import { FakeModuleRepository } from '../../../tests/unit/modules/fakes/FakeModuleRepository';
import { FakeLessonRepository } from '../../../tests/unit/lessons/fakes/FakeLessonRepository';

let createLessonService: CreateLessonService;
let updateLessonService: UpdateLessonService;
let fakeModuleRepository: FakeModuleRepository;
let fakeLessonRepository: FakeLessonRepository;

describe('Update Lesson', () => {
    beforeEach(() => {
        fakeModuleRepository = new FakeModuleRepository();
        createLessonService = new CreateLessonService(
            fakeLessonRepository,
            fakeModuleRepository,
        );
        updateLessonService = new UpdateLessonService(
            fakeLessonRepository,
            fakeModuleRepository,
        );
    });

    it('Should be able to update a lesson', async () => {
        const module = await fakeModuleRepository.create({
            name: 'Python',
            description: 'nice',
        });

        const lesson = await createLessonService.execute({
            name: 'Variable',
            description: 'cool',
            date: new Date(),
            moduleName: module.name,
        });

        const name = 'Javascript';
        const description = 'cool';
        const date = new Date();

        const updatedLesson = await updateLessonService.execute({
            id: lesson.id,
            name,
            description,
            date,
            moduleName: module.name,
        });

        expect(updatedLesson).toEqual(name);
        expect(updatedLesson).toEqual(description);
        expect(updatedLesson).toEqual(date);
        expect(updatedLesson).toEqual(module.name);
    });

    it('should not be able to update a lesson when an id is not found', async () => {
        await expect(
            updateLessonService.execute({
                id: 'd9a4da84d9da84',
                name: 'Variable',
                description: 'cool',
                date: new Date(),
                moduleName: 'Python',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able if module is not found', async () => {
        await expect(
            updateLessonService.execute({
                id: 'd9a4da84d9da84',
                name: 'Variable',
                description: 'cool',
                date: new Date(),
                moduleName: 'Python',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
