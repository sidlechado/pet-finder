import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import Pet from '../../models/Pet';

interface Request {
  name: string;
  race: string;
  age: number;
  weight: number;
  city: string;
  owner: string;
  petId: string;
}

class UpdateService {
  public async execute({
    name,
    race,
    age,
    weight,
    city,
    petId,
    owner,
  }: Request): Promise<Pet> {
    const petsRepository = getRepository(Pet);

    const pet = await petsRepository.findOne({
      where: {
        id: petId,
      },
    });

    if (!pet) {
      throw new AppError('Pet doesnt exists.');
    }

    if (pet.owner_id != owner) {
      throw new AppError('You cant edit this pet.');
    }

    pet.name = name;
    pet.race = race;
    pet.age = age;
    pet.weight = weight;
    pet.city = city;

    await petsRepository.save(pet);

    return pet;
  }
}

export default UpdateService;
