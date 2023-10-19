import 'dotenv/config';
import { z } from 'zod';

const envconfig = z.object({
  RUN_PORT: z.coerce.number().default(8000),
});

const currentEnv = envconfig.safeParse(envconfig);

if (currentEnv.success === false) {
  throw new Error('Invalid Env');
}

export const env = currentEnv.data;
