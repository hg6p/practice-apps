"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const createUpvoteLoader_1 = require("./utils/createUpvoteLoader");
const Upvote_1 = require("./entities/Upvote");
require("reflect-metadata");
const post_1 = require("./resolvers/post");
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const user_1 = require("./resolvers/user");
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
const createUserLoader_1 = require("./utils/createUserLoader");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'mydatabase2',
    synchronize: true,
    logging: true,
    entities: [Post_1.Post, User_1.User, Upvote_1.Upvote],
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('init mikroorm');
    yield exports.AppDataSource.initialize();
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redis = new ioredis_1.default();
    redis.on('ready', function () {
        console.log('Connected to Redis server successfully');
    });
    app.use((0, cors_1.default)({
        origin: [
            'http://localhost:3000',
            'http://localhost:4000/graphql',
            'https://studio.apollographql.com',
        ],
        credentials: true,
    }));
    app.use((0, express_session_1.default)({
        name: constants_1.COOKIE_NAME,
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
    }));
    console.log('setting up redis');
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [post_1.PostResolver, user_1.UserResolver],
            validate: false,
        }),
        csrfPrevention: true,
        context: ({ req, res }) => ({
            req,
            res,
            redis,
            userLoader: (0, createUserLoader_1.createUserLoader)(),
            upvoteLoader: (0, createUpvoteLoader_1.createUpvoteLoader)(),
        }),
    });
    yield apolloServer.start();
    console.log('starting apollo server');
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.listen(4000, () => console.log('listeing on port 4000'));
});
main().catch((e) => console.error(e));
//# sourceMappingURL=index.js.map