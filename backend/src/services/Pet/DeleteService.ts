import { getRepository, DeleteResult } from 'typeorm';

import AppError from '../../errors/AppError';

import Pet from '../../models/Pet';

interface Request {
  owner: string;
  petId: string;
}

class DeleteService {
  public async execute({ petId, owner }: Request): Promise<DeleteResult> {
    const petsRepository = getRepository(Pet);

    const pet = await petsRepository.findOne({
      where: {
        id: petId,
      },
    });

    if (!pet) {
      throw new AppError('Pet doesnt exist.');
    }

    if (pet.owner_id != owner) {
      throw new AppError('You cant delete this pet.');
    }

    const deletedPet = await petsRepository.delete({
      id: petId,
    });

    return deletedPet;
  }
}

export default DeleteService;
