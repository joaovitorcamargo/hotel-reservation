import { FastifyInstance } from 'fastify';
import { Register } from '../controllers/user/register.controller';
import { GetData } from '../controllers/user/get-data.controller';
import { Update } from '../controllers/user/update.controller';
import { Delete } from '../controllers/user/delete.controller';
import { Register as RegisterHotel } from '../controllers/hotel/register.controller';
import { Update as UpdateHotel } from '../controllers/hotel/update.controller';
import { Delete as DeleteHotel } from '../controllers/hotel/delete.controller';
import { GetData as GetDataHotel } from '../controllers/hotel/get-data.controller';

export async function routes(app: FastifyInstance): Promise<void> {
  app.get('/user/:id', GetData.run);
  app.post('/user', Register.run);
  app.patch('/user/:id', Update.run);
  app.delete('/user/:id', Delete.run);

  app.get('/hotel/:id', GetDataHotel.run);
  app.post('/hotel', RegisterHotel.run);
  app.patch('/hotel/:id', UpdateHotel.run);
  app.delete('/hotel/:id', DeleteHotel.run);
}
