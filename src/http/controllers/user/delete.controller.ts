import { validateGetWithUuid } from '@/patterns/decorators/validateGetWithUuid';
import { UserNotFound } from '@/use-cases/error/user-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeDeleteUserUseCase } from '@/patterns/factories/make-delete-user-use-case';

interface DeleteUserRequest {
  id: string;
}

export class Delete {
  private static deleteUserUseCase = makeDeleteUserUseCase();

  @validateGetWithUuid
  static async run(
    request: FastifyRequest<{ Params: DeleteUserRequest }>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      await Delete.deleteUserUseCase.execute(request.params);

      return reply.status(200).send();
    } catch (error) {
      if (error instanceof UserNotFound) {
        return reply.status(404).send({
          message: error.message,
        });
      }
      throw error;
    }
  }
}
