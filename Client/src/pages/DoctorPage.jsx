import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAppointmentsRequest } from '../api/auth'; // Ajusta según la ruta

function DoctorPage() {
    const { user, isAuthenticated } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || user.role !== 'Doctor') {
            navigate('/login'); // Redirige si no es doctor autenticado
        } else {
            loadAppointments();
        }
    }, [isAuthenticated, user, navigate]);

    const loadAppointments = async () => {
        try {
            const response = await getAppointmentsRequest(user.id); // Usa el ID del doctor
            setAppointments(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Welcome, Dr. {user.name}</h2>
            <div style={styles.appointmentContainer}>
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <div key={appointment.id} style={styles.appointmentCard}>
                            <h3>Patient: {appointment.patientName}</h3>
                            <p>Date: {appointment.date}</p>
                            <p>Time: {appointment.time}</p>
                            <p>Notes: {appointment.notes}</p>
                        </div>
                    ))
                ) : (
                    <p>No appointments assigned.</p>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
    },
    title: {
        marginBottom: '2rem',
        color: '#333',
    },
    appointmentContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        justifyContent: 'center',
    },
    appointmentCard: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
        width: '300px',
    },
};

export default DoctorPage;