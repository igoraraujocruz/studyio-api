import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateModuleService } from '@modules/modules/services/CreateModuleService';
import { DeleteModuleService } from '@modules/modules/services/DeleteModuleService';
import { UpdateModuleService } from '@modules/modules/services/UpdateModuleService';
import { ListModulesServices } from '@modules/modules/services/ListModulesService';
import { classToClass } from 'class-transformer';

export class ModulesController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name } = request.body;

        const createModule = container.resolve(CreateModuleService);

        const module = await createModule.execute({
            name
        });

        return response.status(200).json(classToClass(module));
    }

    public async remove(request: Request, response: Response): Promise<Response> {
        try {
          const { id } = request.params;

          const deleteModule = container.resolve(DeleteModuleService);

          const moduleDeleted = await deleteModule.delete(id);

          return response.json(classToClass(moduleDeleted));
        } catch (error) {
          return response.status(400).json({ error });
        }
    }

    public async update(request: Request, response: Response): Promise<Response> {
        try {

          const { id, name } = request.body;

          const updateModule = container.resolve(UpdateModuleService);

          const moduleUpdated = await updateModule.update({
              id,
              name
          });

          return response.json(classToClass(moduleUpdated));
        } catch (error) {
          return response.status(400).json({ error });
        }
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const listModules = container.resolve(ListModulesServices)
        const modules = await listModules.execute();

        return response.json(classToClass(modules));
      }
}
