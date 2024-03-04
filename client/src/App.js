import React from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import ProtectedRoute from './protectedRoute';
import LogoutButton from './LogoutButton';

function App() {
  return (
    <div>
      <RegistrationForm />
      <LoginForm />
      <ProtectedRoute/>
      <LogoutButton/>
    </div>
  );
}

export default App;