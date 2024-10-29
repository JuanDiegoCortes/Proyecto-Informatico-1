import React, { useEffect, useState } from 'react';
import { useAppointment } from '../context/AppointmentContext';
import './ConsultPage.css';

const ConsultPage = () => {
    const { 
        appointments, 
        createAppointment, 
        getAllAppointmentsByUser, 
        errors 
    } = useAppointment();

    const [scheduledDate, setScheduledDate] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        getAllAppointmentsByUser();
    }, []);

    const handleAddAppointment = async (e) => {
        e.preventDefault();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(scheduledDate);

        if (selectedDate < today) {
            alert('Por favor selecciona una fecha futura');
            return;
        }

        try {
            await createAppointment({ 
                date: scheduledDate,
                description
            });

            setScheduledDate('');
            setDescription('');

            getAllAppointmentsByUser();
        } catch (error) {
            console.error("Error al crear la cita:", error);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="consult-container">
            <div className="header">
                <h1>Consultas del Usuario</h1>
            </div>
            <div className="content">
                <div className="form-section">
                    <form onSubmit={handleAddAppointment}>
                        <input
                            type="date"
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            min={today}
                            required
                            className="date-input"
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Descripción"
                            required
                        />
                        <button type="submit">Programar Cita</button>
                    </form>
                </div>
                <div className="queries-section">
                    {appointments.map((appointment) => (
                        <div className="query-card" key={appointment._id}>
                            <h2>Fecha de la cita: {
                                new Date(appointment.date.replace(/T.*/, '') + 'T00:00').toLocaleDateString()
                            }</h2>
                            <p>Descripción: {appointment.description}</p>
                            <p>Estado: {appointment.status}</p>
                            <p>Fecha de creación: {
                                new Date(appointment.createdAt).toLocaleDateString()
                            }</p>
                        </div>
                    ))}
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

export default ConsultPage;
