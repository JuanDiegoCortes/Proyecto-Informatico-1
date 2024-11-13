// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import HomeButton from '../components/HomeButton';

const AdminDashboard = () => {
  const { users, loadUsers, modifyUser, removeUser, assignDoctor, appointments, loadUserAppointments, loadDoctors, doctors, error } = useAdmin();
  const [selectedUserId, setSelectedUserId] = useState(null); // ID del usuario seleccionado para editar
  const [selectedAppointmentsUserId, setSelectedAppointmentsUserId] = useState(null); // ID del usuario seleccionado para ver citas
  const [editData, setEditData] = useState({
    name: '',
    lastname: '',
    username: '',
    birthdate: '',
  });
  const [selectedDoctorId, setSelectedDoctorId] = useState(''); // ID del doctor seleccionado para asignar

  // Cargar usuarios y doctores al inicio
  useEffect(() => {
    loadUsers();
    loadDoctors();
  }, []);

  // Manejar la eliminación de usuarios
  const handleDelete = (userId) => {
    removeUser(userId);
  };

  // Manejar la edición de un usuario
  const handleEdit = (user) => {
    if (selectedUserId === user._id) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(user._id);
      setEditData({
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        birthdate: user.birthdate.split('T')[0],
      });
    }
  };

  // Cargar citas del usuario seleccionado
  const loadAppointments = (userId) => {
    if (selectedAppointmentsUserId === userId) {
      setSelectedAppointmentsUserId(null);
    } else {
      loadUserAppointments(userId);
      setSelectedAppointmentsUserId(userId);
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

  // Manejar actualización del usuario
  const handleUpdate = () => {
    if (!selectedUserId) return;
    modifyUser(selectedUserId, editData);
    setSelectedUserId(null);
  };

  // Manejar asignación de doctor a una cita
  const handleAssignDoctor = (appointmentId) => {
    if (selectedDoctorId) {
      assignDoctor(appointmentId, selectedDoctorId);
    }
  };

  return (
    <div style={styles.container}>
      <HomeButton />
      <h1>Admin Dashboard</h1>
      {error && <p style={styles.errorText}>{error}</p>}
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
                {selectedUserId === user._id ? 'Cancel' : 'Edit'}
              </button>
              <button style={styles.button} onClick={() => handleDelete(user._id)}>
                Delete
              </button>
              <button style={styles.viewAppointmentsButton} onClick={() => loadAppointments(user._id)}>
                {selectedAppointmentsUserId === user._id ? 'Hide Appointments' : 'View Appointments'}
              </button>
            </div>

            {/* Formulario de edición debajo del usuario seleccionado */}
            {selectedUserId === user._id && (
              <div style={styles.editForm}>
                <h3>Edit User</h3>
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
                <button style={styles.cancelButton} onClick={() => setSelectedUserId(null)}>
                  Cancel
                </button>
              </div>
            )}

            {/* Mostrar citas debajo del usuario seleccionado */}
            {selectedAppointmentsUserId === user._id && (
              <ul style={styles.appointmentsList}>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <li key={appointment._id} style={styles.appointmentItem}>
                      <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                      <p><strong>Description:</strong> {appointment.description}</p>
                      <p><strong>Status:</strong> {appointment.status}</p>
                      <p><strong>Doctor:</strong> {appointment.doctorId ? `${appointment.doctorId.name} ${appointment.doctorId.lastname}` : 'Not Assigned'}</p>
                      <select onChange={(e) => setSelectedDoctorId(e.target.value)} style={styles.select}>
                        <option value="">Select Doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor._id} value={doctor._id}>{doctor.name} {doctor.lastname}</option>
                        ))}
                      </select>
                      <button style={styles.assignButton} onClick={() => handleAssignDoctor(appointment._id)}>
                        Assign Doctor
                      </button>
                    </li>
                  ))
                ) : (
                  <p style={styles.noAppointmentsText}>No appointments available</p>
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  userList: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
    maxWidth: '600px',
  },
  userItem: {
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    margin: '5px',
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  viewAppointmentsButton: {
    margin: '5px',
    padding: '5px 10px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  appointmentsList: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
    listStyleType: 'none',
    width: '100%',
    maxWidth: '500px',
  },
  appointmentItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    textAlign: 'center',
  },
  noAppointmentsText: {
    fontStyle: 'italic',
    color: '#777',
  },
  editForm: {
    marginTop: '10px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '90%',
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
    marginTop: '10px',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  select: {
    marginTop: '5px',
    padding: '5px',
    borderRadius: '5px',
  },
  assignButton: {
    marginLeft: '5px',
    padding: '5px 10px',
    backgroundColor: '#FF9800',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};


export default AdminDashboard;
