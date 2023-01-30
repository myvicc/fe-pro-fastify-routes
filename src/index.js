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
let user;

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
  const arrayIdPlusUser = Object.entries(users).find(([userId]) => +userId === id);
  user = arrayIdPlusUser ? arrayIdPlusUser[1] : 0;

    return user;
})

fastify.get("/users", (request) => {
  const { filter, value } = request.query;
  if (filter && value) {
    return Object.values(users).filter((user) => user.hasOwnProperty(filter) && user[filter] === value );
  } else
    return Object.values(users);
})
