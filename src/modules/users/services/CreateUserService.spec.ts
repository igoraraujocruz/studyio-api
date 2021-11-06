import { CreateUserService } from '@modules/users/services/CreateUserService';
import { AppError } from '@shared/errors/AppError';
import { FakeUserRepository } from '../../../tests/unit/users/fakes/FakeUserRepository';

let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;

describe('Create User', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        createUserService = new CreateUserService(fakeUserRepository);
    });

    it('Sould be able to create a new User', async () => {
        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('Sould not to be able to create a new User if email already exist', async () => {
        const name = 'John Doe';
        const password = '123456';
        const email = 'joedoe@gmail.com';

        const user = await createUserService.execute({
            name,
            email,
            password,
        });

        jest.spyOn(fakeUserRepository, 'findByEmail').mockImplementationOnce(
            async () => user,
        );

        await expect(
            createUserService.execute({
                name,
                password,
                email,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
