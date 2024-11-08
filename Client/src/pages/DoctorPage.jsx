import React, { useEffect, useState } from 'react';
import { useDoctorContext } from '../context/DoctorContext';

const DoctorPage = () => {
    const { appointments, fetchAppointments, handleUploadDiagnostic, uploadStatus } = useDoctorContext();
    const doctorId = JSON.parse(localStorage.getItem('user')).id;
    const [selectedFile, setSelectedFile] = useState(null);
    const [diagnosisText, setDiagnosisText] = useState('');
    const [expandedAppointmentId, setExpandedAppointmentId] = useState(null);

    useEffect(() => {
        fetchAppointments(doctorId);
    }, [doctorId, fetchAppointments]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleDiagnosisChange = (event) => {
        setDiagnosisText(event.target.value);
    };

    const handleSubmit = (appointmentId) => {
        const formData = new FormData();
        formData.append('video', selectedFile);
        formData.append('diagnosis', diagnosisText);

        handleUploadDiagnostic(appointmentId, formData);
    };

    const toggleFormVisibility = (appointmentId) => {
        if (expandedAppointmentId === appointmentId) {
            setExpandedAppointmentId(null); // Collapse if already expanded
        } else {
            setExpandedAppointmentId(appointmentId); // Expand new form
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Doctor's Appointments</h2>
            {appointments.map((appointment) => (
                <div key={appointment._id} style={styles.card}>
                    <p style={styles.info}><strong>Patient:</strong> {appointment.userId.name} {appointment.userId.lastname}</p>
                    <p style={styles.info}><strong>Email:</strong> {appointment.userId.email}</p>
                    <p style={styles.info}><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                    <p style={styles.info}><strong>Description:</strong> {appointment.description}</p>
                    <p style={styles.info}><strong>Status:</strong> {appointment.status}</p>
                    
                    <button onClick={() => toggleFormVisibility(appointment._id)} style={styles.expandButton}>
                        {expandedAppointmentId === appointment._id ? 'Hide Form' : 'Show Form'}
                    </button>

                    {expandedAppointmentId === appointment._id && (
                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(appointment._id); }} style={styles.form}>
                            <label style={styles.label}>
                                Upload Video (AVI format):
                                <input type="file" accept=".avi" onChange={handleFileChange} required style={styles.input} />
                            </label>
                            <label style={styles.label}>
                                Diagnosis:
                                <textarea value={diagnosisText} onChange={handleDiagnosisChange} required style={styles.textarea} />
                            </label>
                            <button type="submit" style={styles.button}>Submit Diagnostic</button>
                        </form>
                    )}

                    {uploadStatus && <p style={styles.status}>{uploadStatus}</p>}
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    card: {
        border: '1px solid #ddd',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    info: {
        color: '#555',
        margin: '5px 0',
    },
    expandButton: {
        padding: '8px 12px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: '10px',
        transition: 'background-color 0.3s ease',
    },
    form: {
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: '5px',
    },
    input: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
    },
    textarea: {
        padding: '8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
        height: '80px',
        resize: 'vertical',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
    },
    status: {
        marginTop: '10px',
        fontWeight: 'bold',
        color: '#31708f',
        backgroundColor: '#d9edf7',
        padding: '10px',
        borderRadius: '4px',
        textAlign: 'center',
    },
};

export default DoctorPage;
