import { inject, injectable } from 'tsyringe';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { CreateUserDTO } from '@modules/users/dtos/CreateUserDTO';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs'

@injectable()
export class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        name,
        email,
        password,
    }: CreateUserDTO): Promise<User> {

        const emailExist = await this.usersRepository.findByEmail(
            email,
        );


        if (emailExist) {
            throw new AppError('This email already exist');
        }


        const hashedPassword = await hash(password, 8)

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}
