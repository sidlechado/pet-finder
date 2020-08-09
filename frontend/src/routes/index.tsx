import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Pet from '../pages/PetCreation';
import PetListing from '../pages/PetListing';
import PetAdoption from '../pages/PetAdoption';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/pets" exact component={PetListing} />
    
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/pets/create" component={Pet} isPrivate />
    <Route path="/pets/adoption" component={PetAdoption} isPrivate />
  </Switch>
);

export default Routes;
