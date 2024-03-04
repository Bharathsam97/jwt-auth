import React, { useState } from 'react';
import axios from 'axios';

const ProtectedRoute = () => {
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('/user/protected');
            setResponseData(response.data);
            setError(null);
        } catch (error) {
            setError('An error occurred');
            setResponseData(null);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Get Request Form</h2>
            <form onSubmit={handleFormSubmit}>
                <button type="submit" style={styles.button}>
                    Check Access
                </button>
            </form>

            {responseData && (
                <div>
                    <h3>Response Data</h3>
                    <pre style={styles.responseData}>
                        {JSON.stringify(responseData, null, 2)}
                    </pre>
                </div>
            )}

            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        width: '300px',
        margin: '5px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    button: {
        width: '100%',
        padding: '10px',
        background: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    responseData: {
        padding: '10px',
        background: '#f2f2f2',
        border: '1px solid #ccc',
        borderRadius: '5px',
        overflow: 'auto',
        maxHeight: '200px',
    },
    error: {
        color: 'red',
    },
};

export default ProtectedRoute;
