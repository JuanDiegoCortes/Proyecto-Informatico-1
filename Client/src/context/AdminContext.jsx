// src/context/AdminContext.js
import React, { createContext, useContext, useState } from 'react';
import { fetchAllUsers, updateUser, deleteUser, assignDoctorToAppointment, fetchUserAppointments, fetchDoctors } from '../api/Admin';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
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

  const loadUserAppointments = async (userId) => {
    try {
        const data = await fetchUserAppointments(userId);
        setAppointments(data);
    } catch (err) {
        setError(`Error fetching appointments for user with ID ${userId}`);
    }
  };

  const loadDoctors = async () => {
      try {
          const data = await fetchDoctors();
          setDoctors(data);
      } catch (err) {
          setError('Error fetching doctors');
      }
  };

  return (
    <AdminContext.Provider value={{ users, loadUsers, modifyUser, removeUser, assignDoctor, error,appointments, loadUserAppointments, loadDoctors, doctors }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
