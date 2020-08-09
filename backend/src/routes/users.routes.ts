import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import { getRepository } from 'typeorm';
import User from '../models/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

/**
 * creates and returns a new user
 */
usersRouter.post('/', async (request, response) => {
  const { name, email, password, address } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
    address,
  });

  delete user.password;

  return response.json(user);
});

/**
 * return the list of pets of the current logged in user
 */
usersRouter.get('/pets', ensureAuthenticated, async (request, response) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    relations: ['pets'],
    where: {
      id: request.user.id,
    },
  });

  return response.json(user?.pets);
});

export default usersRouter;
