import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import { IModulesRepository } from '@modules/modules/repositories/IModulesRepository';
import { ModulesRepository } from '@modules/modules/infra/typeorm/repositories/ModulesRepository';


container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IModulesRepository>(
    'ModulesRepository',
    ModulesRepository,
);

