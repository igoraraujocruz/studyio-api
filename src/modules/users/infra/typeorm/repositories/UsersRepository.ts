import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

export default class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async create(data: Partial<User>): Promise<User> {
        const user = this.ormRepository.create(data);
        return this.ormRepository.save(user);
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}
