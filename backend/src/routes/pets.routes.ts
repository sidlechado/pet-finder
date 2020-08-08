import { Router } from 'express';

import CreatePetService from '../services/CreatePetService';

const petsRouter = Router();

petsRouter.post('/', async (request, response) => {
  const { name, race, age, weight, city, owner } = request.body;

  const createPet = new CreatePetService();

  const pet = await createPet.execute({
    name,
    race,
    age,
    weight,
    city,
    owner,
  });

  return response.json(pet);
});

export default petsRouter;
