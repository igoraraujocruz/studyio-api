import 'reflect-metadata';
import { CreateModuleService } from '@modules/modules/services/CreateModuleService';
import { ListModulesServices } from '@modules/modules/services/ListModulesService';
import { AppError } from '@shared/errors/AppError';
import { FakeModuleRepository } from '../../../tests/unit/modules/fakes/FakeModuleRepository';

let createModuleService: CreateModuleService;
let listModulesServices: ListModulesServices;
let fakeModuleRepository: FakeModuleRepository;

describe('List Modules', () => {
    beforeEach(() => {
        fakeModuleRepository = new FakeModuleRepository();
        createModuleService = new CreateModuleService(fakeModuleRepository);
        listModulesServices = new ListModulesServices(fakeModuleRepository);
    });

    it('Should be able to list all users', async () => {
        const module = await createModuleService.execute({
            name: 'Python',
            description: 'nice',
        });

        const modules = await listModulesServices.execute();

        expect(modules).toEqual(expect.arrayContaining([module]));
    });

    it('Should be able to list module by id', async () => {
        const module = await createModuleService.execute({
            name: 'Python',
            description: 'nice',
        });

        const findModule = await listModulesServices.execute(module.id);

        expect(findModule);
    });

    it('Should not be able to list module if id not exist', async () => {
        const id = 'adiasdhaidhasiudhiahdu';
        await expect(listModulesServices.execute(id)).rejects.toBeInstanceOf(
            AppError,
        );
    });
});
