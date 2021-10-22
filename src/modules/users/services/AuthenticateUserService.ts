import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { AppError } from '@shared/errors/AppError';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';


interface Request {
	email: string;
	password: string;
}

interface Response {
	user: User;
    token: string;
}

export class AuthenticateUserService {
	public async execute({ email, password }: Request): Promise<Response> {
		const usersRepository = getRepository(User);

		const user = await usersRepository.findOne({
			where: { email }
		});
		if (!user) {
			throw new AppError('name or password invalid.');
		};

		const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
			throw new AppError('name or password invalid.');
		};

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
			subject: user.id,
			expiresIn: expiresIn
		});

		return {
			user,
            token
		};
	}
}
