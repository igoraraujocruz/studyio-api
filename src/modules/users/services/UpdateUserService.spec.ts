import { CreateUserService } from '@modules/users/services/CreateUserService';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';
import { AppError } from '@shared/errors/AppError';
import { FakeUserRepository } from '../../../tests/unit/users/fakes/FakeUserRepository';

let createUserService: CreateUserService;
let updateUserService: UpdateUserService;
let fakeUserRepository: FakeUserRepository;

describe('Update User', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        createUserService = new CreateUserService(fakeUserRepository);
        updateUserService = new UpdateUserService(fakeUserRepository);
    });

    it('Sould be able to update a user', async () => {
        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const name = 'fulano';
        const password = '654321';
        const email = 'fulano@gmail.com';

        const updatedUser = await updateUserService.execute({
            id: user.id,
            name,
            password,
            email,
        });

        expect(updatedUser.name).toBe(name);
        expect(updatedUser.password).toBe(password);
        expect(updatedUser.email).toBe(email);
    });

    it('Sould not be able if user is not found', async () => {
        await expect(
            updateUserService.execute({
                id: 'dsa64d6as8d',
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Sould not be able if user email is already in use', async () => {
        const email = 'johndoe@example.com';

        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email,
            password: '123456',
        });

        await expect(
            updateUserService.execute({
                id: user.id,
                name: 'John Doe',
                email,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
