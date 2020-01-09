import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import UserForm from '../layout/UserForm';
import { setLoading, unsetLoading } from '../../redux/actions/spinner';
import { setAlert } from '../../redux/actions/notifier';
import { loadUserById } from '../../redux/actions/user';

const EditUser = ({ loadUserById, setAlert, setLoading, unsetLoading }) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    setLoading();
    loadUserById(id, unsetLoading, setAlert, history);
  }, []);

  return <UserForm history={history} />;
};

export default connect(null, {
  loadUserById,
  setAlert,
  setLoading,
  unsetLoading,
})(EditUser);
