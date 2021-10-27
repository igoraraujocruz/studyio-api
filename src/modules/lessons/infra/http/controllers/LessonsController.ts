import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateLessonService } from '@modules/lessons/services/CreateLessonService';
import { DeleteLessonService } from '@modules/lessons/services/DeleteLessonService';
import { UpdateLessonService } from '@modules/lessons/services/UpdateLessonService';
import { ListLessonsServices } from '@modules/lessons/services/ListLessonsService';
import { classToClass } from 'class-transformer';

export class LessonsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, date, moduleName, description } = request.body;

        const createLesson = container.resolve(CreateLessonService);

        const lesson = await createLesson.execute({
            name,
            moduleName,
            date,
            description,
        });

        return response.status(200).json(classToClass(lesson));
    }

    public async remove(request: Request, response: Response): Promise<Response> {
        try {
          const { id } = request.params;

          const deleteLesson = container.resolve(DeleteLessonService);

          const lessonDeleted = await deleteLesson.delete(id);

          return response.json(classToClass(lessonDeleted));
        } catch (error) {
          return response.status(400).json({ error });
        }
    }

    public async update(request: Request, response: Response): Promise<Response> {
        try {

          const { id, name, date, moduleName, description } = request.body;

          const updateLesson = container.resolve(UpdateLessonService);

          const lessonUpdated = await updateLesson.update({
              id,
              name,
              date,
              moduleName,
              description,
          });

          return response.json(classToClass(lessonUpdated));
        } catch (error) {
          return response.status(400).json({ error });
        }
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const listLessons = container.resolve(ListLessonsServices)
        const lessons = await listLessons.execute(id);

        return response.json(classToClass(lessons));
      }
}
