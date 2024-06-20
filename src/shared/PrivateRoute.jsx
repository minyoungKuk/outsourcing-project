import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/modal.context';
import SignInPage from '../page/login/SignInPage';
import useAuthStore from '../zustand/authStore';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const { open, isOpen } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isOpen) {
      open({
        type: 'login',
        content: <SignInPage />,
        onClose: () => navigate('/', { replace: true }),
      });
    }
  }, [isAuthenticated, isOpen, open, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default PrivateRoute;
