import { createUpvoteLoader } from './utils/createUpvoteLoader';
import { Request, Response } from 'express';
import { Session } from 'express-session';
import Redis from 'ioredis';
import { createUserLoader } from './utils/createUserLoader';

export type myContext = {
  req: Request & { session: Session & { userId: number } };
  redis: Redis;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  upvoteLoader: ReturnType<typeof createUpvoteLoader>;
};
