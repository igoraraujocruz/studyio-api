import 'reflect-metadata';
import { CreateLessonService } from '@modules/lessons/services/CreateLessonService';
import { AppError } from '@shared/errors/AppError';
import { FakeLessonRepository } from '../../../tests/unit/lessons/fakes/FakeLessonRepository';
import { FakeModuleRepository } from '../../../tests/unit/modules/fakes/FakeModuleRepository';

let createLessonService: CreateLessonService;
let fakeLessonRepository: FakeLessonRepository;
let fakeModuleRepository: FakeModuleRepository;

describe('Create User', () => {
    beforeEach(() => {
        fakeLessonRepository = new FakeLessonRepository();
        fakeModuleRepository = new FakeModuleRepository();
        createLessonService = new CreateLessonService(
            fakeLessonRepository,
            fakeModuleRepository,
        );
    });

    it('Sould be able to create a new Lesson', async () => {
        const module = await fakeModuleRepository.create({
            name: 'Python',
            description: 'Nice',
        });

        const lesson = await createLessonService.execute({
            name: 'John Doe',
            description: 'nice',
            date: new Date(),
            moduleName: module.name,
        });

        expect(lesson).toHaveProperty('id');
    });

    it('Sould not be able to create a new Lesson if module its no found', async () => {
        const module = {
            id: 'sad4984das4',
            name: 'Python',
            description: 'Nice',
        };

        await expect(
            createLessonService.execute({
                name: 'John Doe',
                description: 'nice',
                date: new Date(),
                moduleName: module.name,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
