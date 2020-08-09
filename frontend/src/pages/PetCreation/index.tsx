import React, { useCallback, useRef } from 'react';
import {FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface PetFormData {
  name: string;
  age: number;
  race: string;
  weight: number;
  city: string;
}

const Pet: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: PetFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          race: Yup.string()
            .required('Raca obrigatória'),
          weight: Yup.number().required('Peso obrigatório'),
          age: Yup.number().required('Idade obrigatória'),
          city: Yup.string().required('Cidade obrigatória')
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = localStorage.getItem('@PetFinder:token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        await api.post('/pets/create', data, config);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Pet criado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no registro',
          description: 'Ocorreu um erro ao tentar registrar seu pet, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

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
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h1>Criar novo pet</h1>

          <Input name="name" icon={FiArrowRight} placeholder="Nome" />
          <Input name="race" icon={FiArrowRight} placeholder="Raça" />

          <Input
            name="age"
            icon={FiArrowRight}
            placeholder="Idade"
          />

          <Input
            name="weight"
            icon={FiArrowRight}
            placeholder="Peso"
          />

          <Input
            name="city"
            icon={FiArrowRight}
            placeholder="Cidade"
          />

          <Button type="submit">Cadastrar novo pet</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Pet;
