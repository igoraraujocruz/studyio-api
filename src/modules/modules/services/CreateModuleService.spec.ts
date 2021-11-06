import 'reflect-metadata';
import { CreateModuleService } from '@modules/modules/services/CreateModuleService';
import { AppError } from '@shared/errors/AppError';
import { FakeModuleRepository } from '../../../tests/unit/modules/fakes/FakeModuleRepository';

let createModuleService: CreateModuleService;
let fakeModuleRepository: FakeModuleRepository;

describe('Create User', () => {
    beforeEach(() => {
        fakeModuleRepository = new FakeModuleRepository();
        createModuleService = new CreateModuleService(fakeModuleRepository);
    });

    it('Sould be able to create a new Module', async () => {
        const module = await createModuleService.execute({
            name: 'John Doe',
            description: 'nice',
        });

        expect(module).toHaveProperty('id');
    });

    it('Sould not be able to create a module if already exist', async () => {
        const name = 'Python';

        await fakeModuleRepository.create({
            name,
            description: 'nice',
        });

        await expect(
            createModuleService.execute({
                name,
                description: 'nice',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
