import React, { useState, useEffect } from 'react';
import { FiArrowLeft} from 'react-icons/fi';

import {
  Container,
  Content,
  Section,
  Pet,
} from './styles';

import api from '../../services/api';
import { Link } from 'react-router-dom';

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
      <header>
          <div>
            <Link to="/">
              <FiArrowLeft />
            </Link>
          </div>
        </header>
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
