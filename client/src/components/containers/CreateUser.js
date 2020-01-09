import React from 'react';
import { useHistory } from 'react-router-dom';

import UserForm from '../layout/UserForm';

const CreateUser = () => {
  const history = useHistory();

  return <UserForm userData={{ minRank: 0 }} history={history} />;
};

export default CreateUser;
