import { inject, injectable } from 'tsyringe';
import { BaseService } from '@shared/services/BaseService';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UpdateUserDTO } from '@modules/users/dtos/UpdateUserDTO';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class UpdateUserService extends BaseService<User> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    super(usersRepository);
  }

  public async update({
    id,
    name,
    email,
    password,
  }: UpdateUserDTO): Promise<User> {

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('E-mail is already in use');
    }

    user.name = name;
    user.email = email;
    user.password = password;


    return this.usersRepository.save(user);
  }
}
