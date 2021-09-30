import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';

@injectable()
export default class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        name,
        email,
        mobilePhone,
        password,
        username,
    }: CreateUserDTO): Promise<User> {
        const user = await this.usersRepository.create({
            name,
            email,
            mobilePhone,
            password,
            username,
        });

        return user;
    }
}
