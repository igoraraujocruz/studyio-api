import 'reflect-metadata';
import { CreateModuleService } from '@modules/modules/services/CreateModuleService';
import { UpdateModuleService } from '@modules/modules/services/UpdateModuleService';
import { AppError } from '@shared/errors/AppError';
import { FakeModuleRepository } from '../../../tests/unit/modules/fakes/FakeModuleRepository';

let createModuleService: CreateModuleService;
let updateModuleService: UpdateModuleService;
let fakeModuleRepository: FakeModuleRepository;

describe('Update Module', () => {
    beforeEach(() => {
        fakeModuleRepository = new FakeModuleRepository();
        createModuleService = new CreateModuleService(fakeModuleRepository);
        updateModuleService = new UpdateModuleService(fakeModuleRepository);
    });

    it('Should be able to update a module', async () => {
        const module = await createModuleService.execute({
            name: 'Python',
            description: 'nice',
        });

        const name = 'Javascript';
        const description = 'cool';

        const updatedUser = await updateModuleService.execute({
            id: module.id,
            name,
            description,
        });

        expect(updatedUser.name).toBe(name);
        expect(updatedUser.description).toBe(description);
    });

    it('Should not be able if module is not found', async () => {
        await expect(
            updateModuleService.execute({
                id: 'dsa64d6as8d',
                name: 'Python',
                description: 'nice',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able if module name is already in use', async () => {
        const name = 'Python';

        const module = await fakeModuleRepository.create({
            name,
            description: 'nice',
        });

        await expect(
            updateModuleService.execute({
                id: module.id,
                name,
                description: 'nice',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
