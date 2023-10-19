import { validateUpdateUser } from '@/patterns/decorators/validateUpdateUser';
import { makeUpdateUserUseCase } from '@/patterns/factories/make-update-user-use-case';
import { UserAlreadyExists } from '@/use-cases/error/user-already-exists-error';
import { UserNotFound } from '@/use-cases/error/user-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';

interface UpdateRequestBody {
  name?: string;
  email?: string;
}

interface UpdateRequestParams {
  id: string;
}

export class Update {
  private static updateUserUseCase = makeUpdateUserUseCase();

  @validateUpdateUser
  static async run(
    request: FastifyRequest<{
      Body: UpdateRequestBody;
      Params: UpdateRequestParams;
    }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const data = {
        ...request.body,
        ...request.params,
      };

      await Update.updateUserUseCase.execute(data);
    } catch (error) {
      if (error instanceof UserNotFound) {
        return reply.status(409).send({
          message: error.message,
        });
      }
      if (error instanceof UserAlreadyExists) {
        return reply.status(409).send({
          message: error.message,
        });
      }
      throw error;
    }
    return reply.status(200).send();
  }
}
