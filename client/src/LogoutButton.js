import React from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      // Make a request to the logout endpoint
      await axios.post('/user/logout');
    } catch (error) {
      console.error('Logout error', error);
      // Handle any errors that occur during logout
    }
  };

  const handleRefresh = async () => {
    try {
      // Make a request to the refresh token endpoint
      await axios.post('/refresh-token');
    } catch (error) {
      console.error('Refresh token error', error);
      // Handle any errors that occur during token refresh
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
      <button onClick={handleRefresh} style={styles.button}>
        Refresh token
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '200px',
    margin: '5px auto',
  },
  button: {
    padding: '10px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default LogoutButton;
