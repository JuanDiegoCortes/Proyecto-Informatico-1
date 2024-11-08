import React, { createContext, useContext, useEffect, useState } from 'react';
import { listAllAppointments, uploadDiagnosticVideo } from '../api/doctor';

const DoctorContext = createContext();

export const useDoctorContext = () => useContext(DoctorContext);

export const DoctorProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(null);

    const fetchAppointments = async (doctorId) => {
        try {
            const response = await listAllAppointments(doctorId);
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleUploadDiagnostic = async (appointmentId, formData) => {
        try {
            const response = await uploadDiagnosticVideo(appointmentId, formData);
            setUploadStatus(response.data.message);
            // Actualizar estado de la cita si es necesario
        } catch (error) {
            console.error('Error uploading diagnostic video:', error);
            setUploadStatus('Error uploading diagnostic video');
        }
    };

    return (
        <DoctorContext.Provider value={{ appointments, fetchAppointments, handleUploadDiagnostic, uploadStatus }}>
            {children}
        </DoctorContext.Provider>
    );
};
