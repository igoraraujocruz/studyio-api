import { container } from 'tsyringe';

import '@modules/users/providers';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import { IUserTokensRepositoy } from '@modules/users/repositories/IUserTokensRepository';
import { UserTokenRepository } from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import { IModulesRepository } from '@modules/modules/repositories/IModulesRepository';
import { ModulesRepository } from '@modules/modules/infra/typeorm/repositories/ModulesRepository';

import { ILessonsRepository } from '@modules/lessons/repositories/ILessonsRepository';
import { LessonsRepository } from '@modules/lessons/infra/typeorm/repositories/LessonsRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IUserTokensRepositoy>(
    'UserTokenRepository',
    UserTokenRepository,
);

container.registerSingleton<IModulesRepository>(
    'ModulesRepository',
    ModulesRepository,
);

container.registerSingleton<ILessonsRepository>(
    'LessonsRepository',
    LessonsRepository,
);
