import 'reflect-metadata';
import { CreateModuleService } from '@modules/modules/services/CreateModuleService';
import { DeleteModuleService } from '@modules/modules/services/DeleteModuleService';
import { FakeModuleRepository } from '../../../tests/unit/modules/fakes/FakeModuleRepository';

let createModuleService: CreateModuleService;
let deleteModuleService: DeleteModuleService;
let fakeModuleRepository: FakeModuleRepository;

describe('Delete User', () => {
    beforeEach(() => {
        fakeModuleRepository = new FakeModuleRepository();
        createModuleService = new CreateModuleService(fakeModuleRepository);
        deleteModuleService = new DeleteModuleService(fakeModuleRepository);
    });

    it('Sould be able to delete a module', async () => {
        const module = await createModuleService.execute({
            name: 'Python',
            description: 'nice',
        });

        await deleteModuleService.delete(module.id);

        expect(200);
    });
});
