// src/context/AdminContext.js
import React, { createContext, useContext, useState } from 'react';
import { fetchAllUsers, updateUser, deleteUser, assignDoctorToAppointment } from '../api/Admin';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Error fetching users');
    }
  };

  const modifyUser = async (userId, userData) => {
    try {
      const updatedUser = await updateUser(userId, userData);
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? updatedUser : user)));
    } catch (err) {
      setError('Error updating user');
    }
  };

  const removeUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err) {
      setError('Error deleting user');
    }
  };

  const assignDoctor = async (appointmentId, doctorId) => {
    try {
      await assignDoctorToAppointment(appointmentId, doctorId);
    } catch (err) {
      setError('Error assigning doctor to appointment');
    }
  };

  return (
    <AdminContext.Provider value={{ users, loadUsers, modifyUser, removeUser, assignDoctor, error }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
