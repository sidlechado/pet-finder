import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Pet from '../models/Pet';

interface Request {
  name: string;
  race: string;
  age: number;
  weight: number;
  city: string;
  owner: string;
}

class CreatePetService {
  public async execute({
    name,
    race,
    age,
    weight,
    city,
    owner,
  }: Request): Promise<Pet> {
    const petsRepository = getRepository(Pet);

    const pet = petsRepository.create({
      name,
      race,
      age,
      weight,
      city,
      owner_id: owner,
    });

    await petsRepository.save(pet);

    return pet;
  }
}

export default CreatePetService;
