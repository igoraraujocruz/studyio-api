import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, username, password, email, mobilePhone } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            username,
            password,
            email,
            mobilePhone,
        });

        return response.status(200).json(classToClass(user));
    }

    public async remove(request: Request, response: Response): Promise<Response> {
        try {
          const { id } = request.params;

          const deleteUser = container.resolve(DeleteUserService);

          const userDeleted = await deleteUser.delete(id);

          return response.json(classToClass(userDeleted));
        } catch (error) {
          return response.status(400).json({ error });
        }
    }
}
