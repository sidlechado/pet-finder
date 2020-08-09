import React, { useState, useEffect } from 'react';

import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Section,
  Pet,
  ButtonContainer,
  ButtonContainer2
} from './styles';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Button from '../../components/Button';

interface Pets {
  id: string;
  name: string;
  race: string;
  age: number;
  weight: number;
  city: string;
  user: {
    email: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [pets, setPets] = useState<Pets[]>([]);

  const token = localStorage.getItem('@PetFinder:token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    handleRender();
  }, []);

  const handleRender = async() => {
    await api
    .get<Pets[]>('/users/pets/me', config)
    .then(response => {
      setPets(response.data);
    });
  }

  const handleDelete = async (petId: String) => {
    await api
      .delete(`pets/delete/${petId}`, config);
    
    handleRender();
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Profile>
            <div>
              <span>Bem vindo, {user.name}</span> 
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
          <h1>Seus pets</h1>
          <ButtonContainer2>
            <Link to="/pets/create">
              <Button>
                Registrar novo pet
              </Button>
            </Link>
            <Link to="/pets/adoption">
              <Button>
              Pets para adoção
              </Button>
            </Link>
          </ButtonContainer2>
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
                </div>
                <ButtonContainer>
                    <Link to="/pets/edit/">
                      <Button>
                        Editar
                      </Button>
                    </Link>
                      <Button onClick={() => handleDelete(pet.id)}>
                        Deletar
                      </Button>
                  </ButtonContainer>
              </Pet>
            ))}
          </Section>
      </Content>
    </Container>
  );
};

export default Dashboard;
