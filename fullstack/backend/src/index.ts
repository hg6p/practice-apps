import 'reflect-metadata';
import { PostResolver } from './resolvers/post';
import { __prod__, COOKIE_NAME } from './constants';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { DataSource } from 'typeorm';
import { Post } from './entities/Post';
import { User } from './entities/User';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'mydatabase2',
  synchronize: true,
  logging: true,
  entities: [Post, User],
});
const main = async () => {
  /*  sendEmail('bob@bob.com', 'hello'); */
  console.log('init mikroorm');
  /*  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();
  await RequestContext.createAsync(orm.em, async () => {
  
    const post = orm.em.create(Post, {
      title: 'my first post',
    } as Post);
    await orm.em.persistAndFlush(post);
    
  }); */

  await AppDataSource.initialize();
  const app = express();
  /* app.set('trust proxy', 1); */

  /* 
  let redisClient = createClient({ legacyMode: true });
  redisClient.connect().catch(console.error);
   */
  const RedisStore = connectRedis(session);
  const redis = new Redis();
  redis.on('ready', function () {
    console.log('Connected to Redis server successfully');
  });
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'http://localhost:4000/graphql',
        'https://studio.apollographql.com',
      ],
      credentials: true,
    })
  );

  /*  redis.set('mykey', 'value'); // Returns a promise which resolves to "OK" when the command succeeds.

  // ioredis supports the node.js callback style

  // Or ioredis returns a promise if the last argument isn't a function
  redis.get('mykey').then((result) => {
    console.log(result); // Prints "value"
  }); */
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
        port: 6379,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        secure: false,
        httpOnly: false,
        sameSite: 'lax',
      },
      saveUninitialized: false,
      secret: 'sadasdsadasda',
      resave: false,
    })
  );
  console.log('setting up redis');

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    csrfPrevention: true,
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });
  await apolloServer.start();
  console.log('starting apollo server');
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => console.log('listeing on port 4000'));
};

main().catch((e) => console.error(e));
