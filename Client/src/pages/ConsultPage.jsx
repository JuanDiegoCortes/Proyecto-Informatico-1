import React, { useEffect, useState } from 'react';
import { useAppointment } from '../context/AppointmentContext';
import './ConsultPage.css';

const ConsultPage = () => {
    const { 
        appointments, 
        createAppointment, 
        getAllAppointmentsByUser, 
        errors,
        getDiagnosticByAppointment 
    } = useAppointment();

    const [scheduledDate, setScheduledDate] = useState('');
    const [description, setDescription] = useState('');
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [expandedAppointmentId, setExpandedAppointmentId] = useState(null); // Nuevo estado
    const [diagnostics, setDiagnostics] = useState({}); // Estado para manejar diagnósticos específicos de cada cita

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

    const handleShowDiagnostic = async (appointmentId) => {
        if (expandedAppointmentId === appointmentId) {
            // Si la cita ya está expandida, ocultamos el diagnóstico
            setExpandedAppointmentId(null);
        } else {
            // Si la cita no está expandida, mostramos el diagnóstico
            setExpandedAppointmentId(appointmentId);
            try {
                const diagnosticData = await getDiagnosticByAppointment(appointmentId);
                
                // Guardar diagnóstico y doctor solo para la cita específica
                setDiagnostics(prevState => ({
                    ...prevState,
                    [appointmentId]: {
                        diagnosis: diagnosticData.diagnosis,
                        doctorName: diagnosticData.doctorId.name,
                        videoUrl: diagnosticData.videoUrl
                    }
                }));
            } catch (error) {
                console.error("Error al obtener el diagnóstico:", error);
            }
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

                            {/* Botón para alternar la visibilidad del diagnóstico */}
                            <button 
                                onClick={() => handleShowDiagnostic(appointment._id)} 
                            >
                                {expandedAppointmentId === appointment._id ? 'Ocultar Diagnóstico' : 'Ver Diagnóstico'}
                            </button>

                            {/* Mostrar diagnóstico solo cuando la cita está expandida y tiene diagnóstico */}
                            {expandedAppointmentId === appointment._id && diagnostics[appointment._id] && (
                                <div className="diagnostic-form">
                                    <div className="diagnostic-section">
                                        <h3>Doctor: {diagnostics[appointment._id].doctorName}</h3> {/* Nombre del doctor */}
                                        <p><strong>Diagnóstico: </strong>{diagnostics[appointment._id].diagnosis}</p> {/* Diagnóstico con el formato solicitado */}
                                        {diagnostics[appointment._id].videoUrl && 
                                            <a href={diagnostics[appointment._id].videoUrl} target="_blank" rel="noopener noreferrer">Ver video de ecografía</a>
                                        }
                                    </div>
                                </div>
                            )}
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
