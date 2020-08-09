import React, { useState, useEffect } from 'react';

import {
  Container,
  Content,
  Section,
  Pet,
} from './styles';

import api from '../../services/api';

interface Pets {
  id: string;
  name: string;
  race: string;
  age: number;
  weight: number;
  city: string;
  owner: {
    email: string;
  };
}

const PetListing: React.FC = () => {
  const [pets, setPets] = useState<Pets[]>([]);

  useEffect(() => {
    handleRender();
  }, []);

  const handleRender = async() => {
    await api
    .get<Pets[]>('/pets')
    .then(response => {
      setPets(response.data);
    });
  }

  return (
    <Container>
      <Content>
          <h1>Pets para adoção</h1>

          <Section>
            {pets.length === 0 && (
              <p>Nenhum pet cadastrado</p>
            )}

            {pets.map(pet => (
              <Pet key={pet.id}>
                <div>
                  <strong>{pet.name}</strong>
                  <p>
                  {pet.race}, {pet.age} anos, {pet.weight} kilos, {pet.city}
                  </p>
                  <p>Email p/ contato: {pet.owner.email}</p>
                </div>
              </Pet>
            ))}
          </Section>
      </Content>
    </Container>
  );
};

export default PetListing;
