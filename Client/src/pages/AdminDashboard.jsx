// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { fetchAllUsers, deleteUser, updateUser } from '../api/Admin';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);  // Usuario seleccionado para editar
  const [editData, setEditData] = useState({
    name: '',
    lastname: '',
    username: '',
    birthdate: '',
  });

  // Cargar usuarios al inicio
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    loadUsers();
  }, []);

  // Manejar la eliminación de usuarios
  const handleDelete = async (userId) => {
    try {
      const response = await deleteUser(userId);
      console.log(response);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Manejar la edición de un usuario
  const handleEdit = (user) => {
    if (selectedUser && selectedUser._id === user._id) {
      // Si el usuario seleccionado es el mismo que el que se está editando, ocultar el formulario
      setSelectedUser(null);
    } else {
      // Establece el usuario a editar
      setSelectedUser(user);
      setEditData({
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        birthdate: user.birthdate.split('T')[0],  // Formatea la fecha
      });
    }
  };

  // Manejar la actualización de datos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      const updatedUser = await updateUser(selectedUser._id, editData);
      console.log('User updated:', updatedUser);
      setUsers(users.map((user) => (user._id === selectedUser._id ? updatedUser : user)));
      setSelectedUser(null);  // Cerrar el formulario de edición
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <ul style={styles.userList}>
        {users.map((user) => (
          <li key={user._id} style={styles.userItem}>
            <div>
                <strong>{user.name} {user.lastname}</strong>
                <p>@{user.username}</p>
                <p>Email: {user.email}</p>
                <p>Birthdate: {user.birthdate.split('T')[0]}</p>
                <p>Role: {user.role}</p>
            </div>
            <div>
              <button style={styles.button} onClick={() => handleEdit(user)}>
                {selectedUser && selectedUser._id === user._id ? 'Cancel' : 'Edit'}
              </button>
              <button style={styles.button} onClick={() => handleDelete(user._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Formulario de edición */}
      {selectedUser && (
        <div style={styles.editForm}>
          <h2>Edit User</h2>
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleInputChange}
            placeholder="Name"
            style={styles.input}
          />
          <input
            type="text"
            name="lastname"
            value={editData.lastname}
            onChange={handleInputChange}
            placeholder="Last Name"
            style={styles.input}
          />
          <input
            type="text"
            name="username"
            value={editData.username}
            onChange={handleInputChange}
            placeholder="Username"
            style={styles.input}
          />
          <input
            type="date"
            name="birthdate"
            value={editData.birthdate}
            onChange={handleInputChange}
            style={styles.input}
          />
          <button style={styles.saveButton} onClick={handleUpdate}>
            Save Changes
          </button>
          <button style={styles.cancelButton} onClick={() => setSelectedUser(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  userList: {
    listStyleType: 'none',
    padding: 0,
  },
  userItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
  },
  button: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  editForm: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AdminDashboard;
