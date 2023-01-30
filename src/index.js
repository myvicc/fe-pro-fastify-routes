import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

export default fastify;

const word = "fuck";
const answerBadWord = "unresolved";
const answerNoUser = 'User not exist';

fastify.post("/uppercase", (request, reply) => {
  const { body } = request;
  if (body.toLowerCase().includes(word.toLowerCase())) {
    reply.status(403);
    return answerBadWord;
  } else {
    reply.status(200);
    return body.toUpperCase();
  }
})

fastify.post("/lowercase", (request, reply) => {
  const { body } = request;

  if (body.toLowerCase().includes(word.toLowerCase())) {
    reply.status(403);
    return answerBadWord;
  } else {
    reply.status(200);
    return body.toLowerCase();
  }
})

const routeUser = '/user';
fastify.get(`${routeUser}/:id`, (request, reply) => {
  const { id } = request.params;

  if (users.hasOwnProperty(id)) {
    return users[id];
  } else {
    reply.status(400);
    return answerNoUser;
  }
})
let result;
fastify.get("/users", (request) => {
  const { filter, value } = request.query;
  if (filter && value) {
    result =  Object.values(users).filter((user) => user[filter] === value);
  } else  {
    result = Object.values(users);
  }
   return result;
})
