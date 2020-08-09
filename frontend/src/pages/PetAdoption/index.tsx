import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import {
  Container,
  Content,
  Section,
  Pet,
} from './styles';

import { useAuth } from '../../hooks/auth';
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
  const { user } = useAuth();
  const [pets, setPets] = useState<Pets[]>([]);

  useEffect(() => {
    handleRender();
  }, []);

  const handleRender = async() => {
    await api
    .get<Pets[]>(`/pets/${user.city}`)
    .then(response => {
      setPets(response.data);
    });
  }

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
          <h1>Pets para adoção em {user.city}</h1>

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
