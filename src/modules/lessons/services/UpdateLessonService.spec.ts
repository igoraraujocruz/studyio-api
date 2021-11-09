import 'reflect-metadata';
import { UpdateLessonService } from '@modules/lessons/services/UpdateLessonService';
import { AppError } from '@shared/errors/AppError';
import { FakeModuleRepository } from '../../../tests/unit/modules/fakes/FakeModuleRepository';
import { FakeLessonRepository } from '../../../tests/unit/lessons/fakes/FakeLessonRepository';

let updateLessonService: UpdateLessonService;
let fakeModuleRepository: FakeModuleRepository;
let fakeLessonRepository: FakeLessonRepository;

describe('Update Lesson', () => {
    beforeEach(() => {
        fakeModuleRepository = new FakeModuleRepository();
        fakeLessonRepository = new FakeLessonRepository();
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

        const lesson = await fakeLessonRepository.create({
            name: 'Variable',
            description: 'cool',
            date: new Date(),
            moduleName: module.name,
        });

        const date = new Date();

        const updatedLesson = await updateLessonService.execute({
            id: lesson.id,
            name: 'constante',
            description: 'good',
            date,
            moduleName: module.name,
        });

        expect(updatedLesson.name).toBe('constante');
        expect(updatedLesson.description).toBe('good');
        expect(updatedLesson.date).toBe(date);
        expect(updatedLesson.moduleId).toBe(lesson.moduleId);
    });

    it('Should not be able to update a lesson when not found by id', async () => {
        const module = await fakeModuleRepository.create({
            name: 'Python',
            description: 'nice',
        });

        await expect(
            updateLessonService.execute({
                id: 'non-existing-lesson-id',
                name: 'Javascript',
                date: new Date(),
                moduleName: module.name,
                description: 'teste',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to update a lesson when module is not found by id', async () => {
        const module = await fakeModuleRepository.create({
            name: 'Python',
            description: 'nice',
        });

        const lesson = await fakeLessonRepository.create({
            name: 'Variable',
            description: 'cool',
            date: new Date(),
            moduleName: module.name,
        });

        const updatedLesson = await updateLessonService.execute({
            id: lesson.id,
            name: 'constante',
            description: 'good',
            date: new Date(),
            moduleName: module.name,
        });

        await expect(
            updateLessonService.execute({
                id: updatedLesson.id,
                name: 'Javascript',
                date: new Date(),
                moduleName: 'undefined',
                description: 'teste',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
