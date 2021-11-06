import 'reflect-metadata';
import { CreateLessonService } from '@modules/lessons/services/CreateLessonService';
import { DeleteLessonService } from '@modules/lessons/services/DeleteLessonService';
import { FakeLessonRepository } from '../../../tests/unit/lessons/fakes/FakeLessonRepository';
import { FakeModuleRepository } from '../../../tests/unit/modules/fakes/FakeModuleRepository';

let createLessonService: CreateLessonService;
let deleteLessonService: DeleteLessonService;
let fakeLessonRepository: FakeLessonRepository;
let fakeModuleRepository: FakeModuleRepository;

describe('Delete User', () => {
    beforeEach(() => {
        fakeLessonRepository = new FakeLessonRepository();
        createLessonService = new CreateLessonService(
            fakeLessonRepository,
            fakeModuleRepository,
        );
        deleteLessonService = new DeleteLessonService(fakeLessonRepository);
    });

    it('Sould be able to delete a lesson', async () => {
        const module = await fakeModuleRepository.create({
            name: 'Python',
            description: 'nice',
        });

        const lessons = await createLessonService.execute({
            name: 'Variables',
            description: 'cool',
            date: new Date(),
            moduleName: module.name,
        });

        await deleteLessonService.delete(lessons.id);

        expect(200);
    });
});
