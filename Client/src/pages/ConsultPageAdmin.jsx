import React, { useEffect, useState } from 'react';
import { useAppointment } from '../context/AppointmentContext';
import './ConsultPage.css';

const ConsultPageAdmin = () => {
    const { appointments, getAllAppointmentsByUser, assignDoctorToAppointment, errors } = useAppointment();
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    useEffect(() => {
        getAllAppointmentsByUser();
        console.log("Appointments:", appointments);
    }, []); 

    const handleAssignDoctor = async (e) => {
        e.preventDefault();
        if (!selectedDoctor || !selectedAppointment) {
            alert('Selecciona una cita y un doctor.');
            return;
        }

        try {
            await assignDoctorToAppointment(selectedAppointment._id, selectedDoctor);
            alert('Doctor asignado correctamente.');
            setSelectedDoctor('');
            setSelectedAppointment(null);
           
        } catch (error) {
            console.error("Error al asignar el doctor:", error);
        }
    };

    return (
        <div className="admin-consult-container">
            <div className="header">
                <h1>Asignación de Doctores a Citas</h1>
            </div>
            <div className="content">
                <div className="appointment-list">
                    {appointments.map((appointment) => (
                        <div
                            className={`appointment-card ${selectedAppointment?._id === appointment._id ? 'selected' : ''}`}
                            key={appointment._id}
                            onClick={() => setSelectedAppointment(appointment)}
                        >
                            <h2>Fecha de la cita: {new Date(appointment.date).toLocaleDateString()}</h2>
                            <p>Descripción: {appointment.description}</p>
                            <p>Estado: {appointment.status}</p>
                        </div>
                    ))}
                </div>
                <div className="assign-doctor-section">
                    <form onSubmit={handleAssignDoctor}>
                        <select
                            value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                            required
                        >
                            <option value="">Selecciona un doctor</option>
                            <option value="doctorId1">Doctor 1</option>
                            <option value="doctorId2">Doctor 2</option>
                        </select>
                        <button type="submit">Asignar Doctor</button>
                    </form>
                </div>
                {errors && (
                    <div className="error-message">
                        {errors}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultPageAdmin;
