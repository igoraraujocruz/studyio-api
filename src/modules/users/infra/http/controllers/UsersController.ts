import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { DeleteUserService } from '@modules/users/services/DeleteUserService';
import { UpdateUserService } from '@modules/users/services/UpdateUserService';
import { ListUsersService } from '@modules/users/services/ListUsersService';
import { classToClass } from 'class-transformer';

export class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, password, email} = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            password,
            email,
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

    public async update(request: Request, response: Response): Promise<Response> {
        try {

          const { id, name, email, password } = request.body;

          const updateUser = container.resolve(UpdateUserService);

          const userUpdated = await updateUser.update({
              id,
              name,
              email,
              password
          });

          return response.json(classToClass(userUpdated));
        } catch (error) {
          return response.status(400).json({ error });
        }
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const { id } = request.body;
        const findUser = container.resolve(ListUsersService);

        const user = await findUser.execute(id);

        return response.json(classToClass(user));
      }
}
