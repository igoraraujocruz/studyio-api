import { CreateUserService } from '@modules/users/services/CreateUserService';
import { ListUsersService } from '@modules/users/services/ListUsersService';
import { AppError } from '@shared/errors/AppError';
import { FakeUserRepository } from '../../../tests/unit/users/fakes/FakeUserRepository';

let createUserService: CreateUserService;
let listUsersService: ListUsersService;
let fakeUserRepository: FakeUserRepository;

describe('List User', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        createUserService = new CreateUserService(fakeUserRepository);
        listUsersService = new ListUsersService(fakeUserRepository);
    });

    it('Should be able to list all users', async () => {
        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const users = await listUsersService.execute();

        expect(users).toEqual(expect.arrayContaining([user]));
    });

    it('Should be able to list user by id', async () => {
        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const findUser = await listUsersService.execute(user.id);

        expect(findUser);
    });

    it('Should not be able to list user if id not exist', async () => {
        const id = 'adiasdhaidhasiudhiahdu';
        await expect(listUsersService.execute(id)).rejects.toBeInstanceOf(
            AppError,
        );
    });
});
