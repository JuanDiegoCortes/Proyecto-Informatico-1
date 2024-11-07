import React, { useState, useEffect } from 'react';
import useUsers from '../api/Users'; 

const UserAdminPage = () => {
    const { users, loading, error, getAllUsers, deleteUser } = useUsers(); 
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        getAllUsers();
        console.log(Array.isArray(users));
    }, []); 

    const handleDeleteUser = (userId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            deleteUser(userId); 
        }
    };

    
    const styles = {
        adminContainer: {
            maxWidth: '1000px',
            margin: '20px auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        },
        header: {
            textAlign: 'center',
            fontSize: '2rem',
            color: '#2c3e50',
            marginBottom: '30px',
        },
        list: {
            listStyle: 'none',
            padding: 0,
        },
        listItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px',
            marginBottom: '15px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '1rem',
            transition: 'background-color 0.3s ease',
        },
        listItemHover: {
            backgroundColor: '#f1f1f1',
        },
        listItemSpan: {
            fontWeight: 500,
            color: '#34495e',
        },
        button: {
            padding: '6px 12px',
            marginLeft: '10px',
            fontSize: '0.9rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            opacity: 0.8,
        },
        deleteButton: {
            backgroundColor: '#e74c3c',
            color: 'white',
        },
        viewButton: {
            backgroundColor: '#3498db',
            color: 'white',
        },
        p: {
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#34495e',
        },
        error: {
            color: '#e74c3c',
        },
        loading: {
            color: '#f39c12',
        },
        detailsContainer: {
            backgroundColor: '#fff',
            padding: '20px',
            margin: '20px 0',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        },
        detailsHeader: {
            fontSize: '1.5rem',
            marginBottom: '10px',
            color: '#2c3e50',
        },
        detailsText: {
            fontSize: '1rem',
            margin: '5px 0',
            color: '#34495e',
        },
        closeButton: {
            padding: '8px 16px',
            backgroundColor: '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontSize: '1rem',
        },
        closeButtonHover: {
            backgroundColor: '#7f8c8d',
        },
    };

    return (
        <div style={styles.adminContainer}>
            <h1 style={styles.header}>Administrar Usuarios</h1>
            
            {loading ? (
                <p style={styles.loading}>Cargando usuarios...</p>
            ) : error ? (
                <p style={styles.error}>Error: {error}</p>
            ) : (
                <ul style={styles.list}>
                    {users.map((user) => (
                        <li
                            key={user._id}
                            style={{ ...styles.listItem, ...(user._id === selectedUser?._id && styles.listItemHover) }}
                        >
                            <span style={styles.listItemSpan}>
                                {user.name} {user.lastname} - {user.email}
                            </span>
                            <button
                                style={{ ...styles.button, ...styles.viewButton }}
                                onClick={() => setSelectedUser(user)}
                            >
                                Ver Detalles
                            </button>
                            <button
                                style={{ ...styles.button, ...styles.deleteButton }}
                                onClick={() => handleDeleteUser(user._id)}
                            >
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserAdminPage;
